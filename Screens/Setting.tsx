import React, { useEffect, useState } from "react";
import { SettingStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Animated, Switch } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StackNavigationProp } from "@react-navigation/stack";
import { SettingStackParamList } from "../Types";

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'Settings'>;

type Props = {
  navigation: SettingScreenNavigationProp;
  onSignOut: () => void;
  userName: string;
};

const Setting = ({ navigation, onSignOut }: Props) => {
  const [userName, setUserName] = useState('John Doe');
  const [colorAnim] = useState(new Animated.Value(0)); 
  
  const [isNightMode, setIsNightMode] = useState(false);

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

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsNightMode(prevMode => !prevMode);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isNightMode ? '#333' : '#FDE6F6' }]}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Animated.Text style={[styles.userName, { color: colorInterpolation }]}>
          {userName}
        </Animated.Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Categories</Text>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoExpensesCategory')}>
          <MaterialIcons name= "trolley" size={24} color={isNightMode ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: isNightMode ? 'white' : 'black' }]}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoIncomeCategory')}>
          <Ionicons name="cash-outline" size={24} color={isNightMode ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: isNightMode ? 'white' : 'black' }]}>Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoBackUpCloud')}>
          <Ionicons name="cloud-upload" size={24} color={isNightMode ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: isNightMode ? 'white' : 'black' }]}>Backup to Cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row}
          onPress={onSignOut}>
          <Ionicons name="log-out" size={24} color={isNightMode ? 'white' : '#393533'} style={styles.icon} />
          <Text style={[styles.rowText, { color: isNightMode ? 'white' : 'black' }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Toggle Dark Mode */}
      <View style={styles.toggleContainer}>
        <Text style={[styles.toggleText, { color: isNightMode ? 'white' : 'black' }]}>
          {isNightMode ? 'Night Mode' : 'Day Mode'}
        </Text>
        <Switch
          trackColor={{ false: "#FFDDDD", true: "#1E1E1E" }}
          thumbColor={isNightMode ? "#FFFFFF" : "#F57CBB"}
          onValueChange={toggleDarkMode}
          value={isNightMode}
        />
      </View>
    </SafeAreaView>
  );
};

export default Setting;
