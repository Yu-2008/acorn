import React, { useState} from "react";
import { BackUpCloudStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Platform, Alert } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../Types";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from '../ThemeContext';
import { useUser } from "../UserContext";

import { exportAllTablesToJson, restoreFromJson } from "../SQLite";

import { FIREBASE_DB } from "../FirebaseConfig";
import { doc, setDoc, getDoc } from 'firebase/firestore';

type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ route, navigation }: Props) => {
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
      Alert.alert("Success", "Backup to cloud completed.");
      console.log("Backup uploaded:", jsonData);
    } catch (error) {
      console.error("Backup Error:", error);
      Alert.alert("Error", "Failed to back up data.");
    }
  };

  // Restore function
  const handleRestore = async () => {
  
    if (!userID) {
      Alert.alert("User not signed in. Cannot save category.");
      return;
    }

    try {
      const docRef = doc(FIREBASE_DB, "backups", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const backupData = docSnap.data();
        const tables = backupData.data;

        // Clear old data if necessary (optional and depends on your logic)
        // Then restore:
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
  };


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
        <TouchableOpacity style={styles.button} onPress={handleBackup}>
          <Ionicons name="cloud-upload" size={24} color="white" />
          <Text style={styles.buttonText}>Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRestore}>
          <MaterialIcons name="cloud-download" size={24} color="white" />
          <Text style={styles.buttonText}>Restore from Cloud</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BackUpCloud;
