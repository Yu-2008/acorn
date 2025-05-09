import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Animated, Switch,Image, Linking, Alert, Platform, TextInput } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { SettingStyles as styles } from '../src/styles/Styles';
import type { StackNavigationProp } from "@react-navigation/stack";
import { SettingStackParamList } from "../src/types/Types";
import PagerView from 'react-native-pager-view';
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { FIREBASE_AUTH } from "../src/config/FirebaseConfig";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth"; // Added imports
import { getUsernameById } from "../src/database/database";
import { useFocusEffect } from "@react-navigation/native";
import { createMapLink } from 'react-native-open-maps';
import { deleteUserAccById } from "../src/database/database";



type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'Settings'>;

type Props = {
navigation: SettingScreenNavigationProp;
userName: string;
};

// Settings Component
const Setting = ({ navigation }:Props) => {
  const { userID } = useUser();
  const [username, setUsername] = useState('');
  const [colorAnim] = useState(new Animated.Value(0)); 
  const { theme, toggleTheme } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      const loadIncomeCategories = async () => {
        if (userID) {
          const user = await getUsernameById(userID);
          setUsername(user ?? ' '); 
        } else {
          console.log("Cannot get user ID.");
        }
      };
      loadIncomeCategories();
    }, [userID])
  );

  // handle onPress
  const handleExpensesCategory =()=> {
    console.log('Expenses Category pressed');
    navigation.navigate('GoExpensesCategory');
  };
  
  const handleIncomeCategory =()=> {
    console.log('Income Category pressed');
    navigation.navigate('GoIncomeCategory');
  };

  const handleBackupCloud =()=> {
    console.log("Backup Cloud pressed");
    navigation.navigate('GoBackUpCloud');
  };

  const handleOnSignOut = async () => {
    console.log("Sign Out pressed");
    try {
      await FIREBASE_AUTH.signOut();
      console.log(`Sign out successfully for user ${username}.`);
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const user = FIREBASE_AUTH.currentUser;
            if (!user || !userID) {
              console.warn("No user is currently signed in.");
              return;
            }
  
            try {
              await user.delete();
              console.log("User account deleted successfully in Firebase.");
              
              await deleteUserAccById(userID);
              console.log("User data deleted successfully in local.");
            } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                Alert.alert(
                  "Re-authentication Required",
                  "To protect your account, please re-enter your password to confirm deletion.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Re-authenticate",
                      onPress: async () => {
                        const user = FIREBASE_AUTH.currentUser;
                        if (!user || !user.email) {
                          Alert.alert("Error", "Could not retrieve user details for re-authentication.");
                          return;
                        }

                        // Simplified password prompt - A custom modal is recommended for production
                        let password = '';
                        if (Platform.OS === 'ios') {
                          await new Promise<void>((resolve) => {
                            Alert.prompt(
                              "Enter Password",
                              "Please enter your current password to continue.",
                              [
                                { text: "Cancel", onPress: () => resolve(), style: "cancel" },
                                { text: "OK", onPress: (pwd) => { password = pwd || ''; resolve(); }},
                              ],
                              "secure-text"
                            );
                          });
                        } else {
                          Alert.alert(
                            "Enter Password ",
                            "Android requires a custom input for password re-authentication. This feature is not fully implemented in this basic prompt. Please implement a custom modal.",
                            [{text: "OK"}]
                          );
                          // For demonstration, we'll allow proceeding without password on Android,
                          // but this is NOT secure and for testing purposes only.
                          // In a real app, you must get the password.
                          // password = "TEMPORARY_ANDROID_PASSWORD_PLACEHOLDER"; // REMOVE THIS IN PRODUCTION
                          console.warn("ANDROID PASSWORD PROMPT: Using placeholder or no password. Implement a secure custom modal.");
                          // To actually test re-auth on Android, you'd need to manually provide a password here
                          // or build the custom modal. For now, re-auth will likely fail on Android.
                        }

                        // Only check if password was expected (iOS)
                        if (!password && Platform.OS === 'ios') { 
                          Alert.alert("Cancelled", "Password entry cancelled. Account deletion aborted.");
                          return;
                        }
                        // If on Android and no password mechanism, re-auth will fail.
                        // If you added a placeholder password for Android testing, it will proceed.

                        const credential = EmailAuthProvider.credential(user.email, password);
                        try {
                          await reauthenticateWithCredential(user, credential);
                          console.log("User re-authenticated successfully.");
                          // Try deleting again
                          await user.delete();
                          console.log("User account deleted successfully in Firebase after re-authentication.");
                          await deleteUserAccById(userID);
                          console.log("User data deleted successfully in local after re-authentication.");
                          Alert.alert("Success", "Your account has been deleted.");
                        } catch (reauthError: any) {
                          console.error("Error during re-authentication or subsequent deletion:", reauthError);
                          Alert.alert("Re-authentication Failed", `Could not re-authenticate or delete account. Error: ${reauthError.message}. Please sign out, sign back in, and try again.`);
                        }
                      },
                    },
                  ]
                );
              } else {
                console.log("Error deleting user account:", error);
                Alert.alert("Error", `An error occurred while trying to delete your account: ${error.message}`);
              }
            }
          },
        },
      ]
    );
  };
  

  useEffect(() => {
    const startColorAnimation = () => {
      Animated.loop(
        Animated.sequence([ 
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 2000, 
            useNativeDriver: false, 
          }),
          Animated.timing(colorAnim, {
            toValue: 0, 
            duration: 2000, 
            useNativeDriver: false, 
          }),
        ])
      ).start();
    };

    startColorAnimation();
  }, [colorAnim]);

  const colorInterpolation = colorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#E248BA', '#A767D6', '#6C86F1'],
  });
  
  // Geolocation Component (Button for searching UTAR location)
const GeolocationPage = () => {
  const queryLocation = () => {
    const mapLink = createMapLink({ 
      provider: 'google', 
      query: 'Universiti Tunku Abdul Rahman (UTAR) (UTAR Sungai Long Campus), Jalan Sungai Long, Bandar Sungai Long, 43000 Kajang, Selangor' 
    });
    Linking.openURL(mapLink);
  }
const handleContactUs = () => {
  const whatsappLink = "https://chat.whatsapp.com/DXH6ke53Zsa93oRyfZRlAX";
  Linking.openURL(whatsappLink);
};
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={queryLocation} style={[styles.button,{marginTop:20},{ backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]}>
          <Feather name="map-pin" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
          <Text style={[styles.buttonText,{ color: theme === 'dark' ? '#fff' : '#393533' }]}>Search for Acorn Company</Text>
      </TouchableOpacity>
      <Text style={[styles.buttonText, { color: theme === 'dark' ? '#fff' : 'gray' }]}>Address:</Text>
      <Text style={[styles.buttonText, { color: theme === 'dark' ? '#fff' : 'gray' }]}>Universiti Tunku Abdul Rahman (UTAR) (UTAR Sungai Long Campus), Jalan Sungai Long, Bandar Sungai Long, 43000 Kajang, Selangor</Text>

      {/* Contact Us Button for WhatsApp */}
      <TouchableOpacity onPress={handleContactUs} style={[styles.button, { marginTop: 20 },{backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]}>
        <Feather name="message-circle" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
        <Text style={[styles.buttonText, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Contact Us (WhatsApp)</Text>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <PagerView style={{ flex: 1 }} initialPage={0}>
        {/* First Page - Settings */}
        <View key="1">
          <View style={styles.header}>
            <Text style={[styles.greeting, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Hello,</Text>
            <Animated.Text style={[styles.userName, { color: colorInterpolation }]}>
              {username}
            </Animated.Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Manage Categories</Text>

            <TouchableOpacity 
              style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
              onPress={handleExpensesCategory}>
              <MaterialIcons name="trolley" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
              <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Expenses</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
              onPress={handleIncomeCategory}>
              <Ionicons name="cash-outline" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
              <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Income</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Account</Text>

            <TouchableOpacity 
              style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
              onPress={handleBackupCloud}>
              <Ionicons name="cloud-upload" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
              <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Backup to Cloud</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
              onPress={handleOnSignOut}>
              <Ionicons name="log-out" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
              <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Sign Out</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
              onPress={handleDeleteAccount}>
              <Ionicons name="trash-outline" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
              <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
         
          {/* Toggle Dark Mode */}
            <View style={styles.toggleContainer}>
              <Text style={[styles.toggleText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                {theme === 'dark' ? 'Night Mode' : 'Day Mode'}
              </Text>
              <Switch
                trackColor={{ false: "#FFDDDD", true: "#1E1E1E" }}
                thumbColor={theme === 'dark' ? "#FFFFFF" : "#F57CBB"}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
              />
            </View>
        </View>


        


        {/* Second Page - Geolocation */}
        <View key="2">
          <View style={styles.logoContainer}>
            <Image source={require('../img/logo.jpg')} style={styles.logo} />
          </View>
        <GeolocationPage />
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

export default Setting;
