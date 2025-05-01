import React, { useState, useContext } from "react";
import { BackUpCloudStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, Platform } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../Types";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [lastBackupTime, setLastBackupTime] = useState("Not yet backed up");

  // Backup function
  const handleBackup = () => {
    setLastBackupTime(new Date().toLocaleString()); 
    console.log("Backing up data to the cloud...");
  };

  // Restore function
  const handleRestore = () => {
    console.log("Restoring data from the cloud...");
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
