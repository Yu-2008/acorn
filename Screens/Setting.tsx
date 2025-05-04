import React, { useState, useEffect, useContext } from "react";
import { SettingStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Animated, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StackNavigationProp } from "@react-navigation/stack";
import { SettingStackParamList } from "../Types";
import { useTheme } from '../ThemeContext';
import { FIREBASE_AUTH } from "../FirebaseConfig";

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'Settings'>;

type Props = {
  navigation: SettingScreenNavigationProp;
  userName: string;
};

const Setting = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('John Doe');
  const [colorAnim] = useState(new Animated.Value(0)); 
  const { theme,toggleTheme } = useTheme();

  {/**handle onPress */}
  const handleExpensesCategory =()=>{
    console.log('Expenses Category pressed');
    navigation.navigate('GoExpensesCategory');
  }
  const handleIncomeCategory =()=>{
    console.log('Income Category pressed');
    navigation.navigate('GoIncomeCategory');
    
  }
  const handleBackupCloud =()=>{
    console.log("Backup Cloud pressed");
    navigation.navigate('GoBackUpCloud')
  }
  const handleOnSignOut = async()=>{
    console.log("Sign Out pressed");
    try {
      console.log("Sign Out pressed");
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    //onSignOut();
  }

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Hello,</Text>
        <Animated.Text style={[styles.userName, { color: colorInterpolation }]}>
          {userName}
        </Animated.Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Manage Categories</Text>

        <TouchableOpacity 
          style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
          onPress={() => navigation.navigate('GoExpensesCategory')}>
          <MaterialIcons name="trolley" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
          onPress={() => navigation.navigate('GoIncomeCategory')}>
          <Ionicons name="cash-outline" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: theme === 'dark' ? 'white' : 'black' }]}>Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#393533' }]}>Account</Text>

        <TouchableOpacity 
          style={[styles.row, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}
          onPress={() => navigation.navigate('GoBackUpCloud')}>
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
    </SafeAreaView>
  );
};

export default Setting;
