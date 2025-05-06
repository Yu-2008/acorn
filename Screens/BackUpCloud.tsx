import React, { useEffect, useState} from "react";
import { BackUpCloudStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Platform } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../Types";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from '../ThemeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const [lastBackupTime, setLastBackupTime] = useState("Not yet backed up");

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

  {/**handle onPress */}
  // Backup function
  const handleBackup = async () => {
    try{
      const currentTime = new Date().toLocaleString();
      setLastBackupTime(currentTime);
      await AsyncStorage.setItem('lastBackupTime', currentTime);
      console.log("Backup successful:", currentTime); 
    } catch (error) {
      console.error("Error saving backup:", error);
    }
  };

  // Restore function
  const handleRestore = async() => {
    try {
      const storedTime = await AsyncStorage.getItem('lastBackupTime');
      if (storedTime) {
        setLastBackupTime(storedTime);
        console.log("Restored backup time: ", storedTime);
      } else {
        console.log("No backup found to restore.");
      }
    } catch (error) {
      console.error("Error restoring backup:", error);
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
          <Ionicons name="cloud-upload" size={24} color={theme === 'dark' ? 'white' : '#393533'}/>
          <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Backup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRestore}>
          <MaterialIcons name="cloud-download" size={24} color={theme === 'dark' ? 'white' : '#393533'} />
          <Text style={[styles.buttonText, { color: theme === 'dark' ? 'white' : 'black' }]}>Restore from Cloud</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BackUpCloud;
