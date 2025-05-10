import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Animated, Switch,Image, Linking, Alert } from "react-native";
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
const Setting = ({ onSignOut, navigation }: { onSignOut: () => void; navigation: any }) => {
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
              Alert.alert("Delete account success", "Your user account has been deleted permanently. Thank you for using our App.")
            } catch (error: any) {
              if (error.code === 'auth/requires-recent-login') {
                Alert.alert("Re-authentication Required", "Please sign in again to delete your account.");
                await FIREBASE_AUTH.signOut();
                console.log("User signed out successfully.");
              } else {
                console.log("Error deleting user account:", error);
                Alert.alert("Delete account failed", error.message)
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
              onPress={onSignOut}>
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
