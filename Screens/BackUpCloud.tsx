import React, { useEffect, useState} from "react";
import { BackUpCloudStyles as styles } from '../src/styles/Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Platform, Alert } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../src/types/Types";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from '../src/contexts/ThemeContext';

import { useUser } from "../src/contexts/UserContext";

import { exportAllTablesToJson, restoreFromJson } from "../src/database/database";

import { FIREBASE_DB } from "../src/config/FirebaseConfig";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";


type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { userID } = useUser();
  const [lastBackupTime, setLastBackupTime] = useState("Not yet backed up");

 
  {/**handle onPress */}
  // Backup function
  const handleBackup = async () => {

    if (!userID) {
      Alert.alert("User not signed in. Cannot save category.");
      return;
    }

    try {
      const jsonData = await exportAllTablesToJson();
  
      const docRef = doc(FIREBASE_DB, "backups", userID);
      await setDoc(docRef, {
        timestamp: new Date().toISOString(),
        data: JSON.parse(jsonData), 
      });
  
      setLastBackupTime(new Date().toLocaleString());

      const currentTime = new Date().toLocaleString();
      setLastBackupTime(currentTime);
      await AsyncStorage.setItem('lastBackupTime', currentTime);
      console.log("Backup successful:", currentTime); 
      Alert.alert("Success", "Backup to cloud completed.");
      console.log("Backup uploaded:", jsonData);
    } catch (error) {
      console.error("Backup Error:", error);
      Alert.alert("Error", "Failed to back up data.");
    }
  }


  useEffect(() => {
    const loadBackupTime = async () => {
      try{
        const storedTime = await AsyncStorage.getItem('lastBackupTime');
        if (storedTime) {
          setLastBackupTime(storedTime);
        }
      } catch (error) {
        console.error("Error loading backup time: ", error);
      }
    };
    loadBackupTime();
  }, []);



  // Restore function

  const handleRestore = async () => {
  
    if (!userID) {
      Alert.alert("User not signed in. Cannot save category.");
      return;
    }

    try {

      const storedTime = await AsyncStorage.getItem('lastBackupTime');
      if (storedTime) {
        setLastBackupTime(storedTime);
        console.log("Restored backup time: ", storedTime);
      } else {
        console.log("No backup found to restore.");
      }

      const docRef = doc(FIREBASE_DB, "backups", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const backupData = docSnap.data();
        const tables = backupData.data;
        await restoreFromJson(tables);

        Alert.alert("Success", "Restore completed from cloud.");
        console.log("Restored data:", tables);
      } else {
        Alert.alert("No Backup", "No backup found for this user.");
      }
    } catch (error) {
      console.error("Restore Error:", error);
      Alert.alert("Error", "Failed to restore data.");
    }
  }


  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }, 
      ]}
    >
      <View style={styles.lastBackupContainer}>
        <Text
          style={[
            styles.label,
            { color: theme === 'dark' ? '#fff' : '#000' }, 
          ]}
        >
          Last Backup Time:
        </Text>
        <Text
          style={[
            styles.lastBackupText,
            { color: theme === 'dark' ? '#fff' : '#000' }, 
          ]}
        >
          {lastBackupTime}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{ backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]} onPress={handleBackup}>
          <Ionicons name="cloud-upload" size={24} color={theme === 'dark' ? 'white' : '#393533'}/>
          <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button,{ backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]} onPress={handleRestore}>
          <MaterialIcons name="cloud-download" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
          <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Restore from Cloud</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BackUpCloud;
