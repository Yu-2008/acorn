import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, Animated, Switch,Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { SettingStyles as styles } from '../Styles';
import type { StackNavigationProp } from "@react-navigation/stack";
import { SettingStackParamList } from "../Types";
import PagerView from 'react-native-pager-view';
import { useTheme } from '../ThemeContext';
import { useUser } from "../UserContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { getUsernameById } from "../SQLite";
import { useFocusEffect } from "@react-navigation/native";
import { createMapLink } from 'react-native-open-maps';
import { Linking } from 'react-native';



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
          console.error("Cannot get user ID.");
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
      console.error("Error signing out:", error);
    }
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
    inputRange: [0, 1],
    outputRange: ["#FF9068", "#FFB6B6"], 
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
      <TouchableOpacity onPress={queryLocation} style={[styles.button,{marginTop:20}]}>
          <Feather name="map-pin" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
          <Text style={[styles.buttonText,{ color: theme === 'dark' ? '#fff' : '#393533' }]}>Search for Acorn Company</Text>
      </TouchableOpacity>

      {/* Contact Us Button for WhatsApp */}
      <TouchableOpacity onPress={handleContactUs} style={[styles.button, { marginTop: 20 }]}>
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
