import React, { useEffect, useState} from "react";
import { BackUpCloudStyles as styles } from '../src/styles/Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
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
import RNFS from 'react-native-fs';

type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ navigation }: Props) => {
 // Theme and user context
  const { theme } = useTheme();
  const { userID } = useUser();
  // State hooks to manage backup and restore UI
  const [lastBackupTime, setLastBackupTime] = useState("Not yet backed up");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
 
  {/**handle onPress */}
  // Backup function
  const handleBackup = async () => {
    setLoading1(true);

    if (!userID) {
      Alert.alert("Get user ID failed", "User is not signed in. Cannot generate back up files.\nPlease sign in again.");
      setLoading1(false);
      return;
    }

    try {
      // Export all tables as JSON
      const jsonData = await exportAllTablesToJson(userID);
      // Upload backup data to Firebase Cloud
      const docRef = doc(FIREBASE_DB, "backups", userID);
      await setDoc(docRef, {
        timestamp: new Date().toISOString(),
        data: JSON.parse(jsonData), // Parse the JSON data to Firebase
      });

      // ✅ Save to local file
      const path = `${RNFS.DocumentDirectoryPath}/backup_${userID}.json`;
      await RNFS.writeFile(path, jsonData, 'utf8');
      console.log("Backup saved locally at:", path);
  
      setLastBackupTime(new Date().toLocaleString());
      // Update last backup time and store it in AsyncStorage
      const currentTime = new Date().toLocaleString();
      setLastBackupTime(currentTime);
      await AsyncStorage.setItem('lastBackupTime', currentTime);
      console.log("Backup successful:", currentTime); 
      console.log("Backup uploaded:", jsonData);
      Alert.alert("Backup successful", "Your backup already upload to cloud.");
    } catch (error) {
      console.log("Backup Error:", error);
      Alert.alert("Backup failed", "Please try again.");
    } finally {
      setLoading1(false);
    }
  }

// Function to load last backup time from AsyncStorage on component mount
  useEffect(() => {
    const loadBackupTime = async () => {
      try{
        const storedTime = await AsyncStorage.getItem('lastBackupTime');
        if (storedTime) {
          setLastBackupTime(storedTime);  // Set the stored backup time
        }
      } catch (error) {
        console.log("Error loading backup time: ", error);
      }
    };
    loadBackupTime();
  }, []);



  // Restore function

  const handleRestore = async () => {
    
    setLoading2(true);
    if (!userID) {
      Alert.alert("Get user ID failed", "User is not signed in. Cannot get restore file.\nPlease sign in again.");
      setLoading2(false);
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
        await restoreFromJson(userID, tables);

        Alert.alert("Restore successful", "Your data already replace with your last backup.");
        console.log("Restored data:", tables);
      } else {
        Alert.alert("Restore failed", "No backup found for this user.");
      }
    } catch (error) {
      console.log("Restore Error:", error);
      Alert.alert("Restore failed", "Please try again.");
    } finally {
      setLoading2(false);
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
        {/* Backup button */}
        {loading1 ? (<ActivityIndicator size="large" color="#0000ff" /> )
        : 
        (
            <TouchableOpacity style={[styles.button,{ backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]} onPress={handleBackup}>
              <Ionicons name="cloud-upload" size={24} color={theme === 'dark' ? 'white' : '#393533'}/>
              <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Backup</Text>
            </TouchableOpacity>
        )}
         {/* Restore button */}
        {loading2 ? (<ActivityIndicator size="large" color="#0000ff" /> )
        : 
        (
          <TouchableOpacity style={[styles.button,{ backgroundColor: theme === 'dark' ? '#444' : '#E69DB8' }]} onPress={handleRestore}>
            <MaterialIcons name="cloud-download" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
            <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Restore from Cloud</Text>
          </TouchableOpacity>
        )}
        
      </View>
    </SafeAreaView>
  );
};

export default BackUpCloud;
