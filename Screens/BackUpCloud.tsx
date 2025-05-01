import React, { useState } from "react";
import { BackUpCloudStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../Types";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;

const BackUpCloud = ({ route, navigation }: Props) => {
  const [lastBackupTime, setLastBackupTime] = useState("Not yet backed up"); // Mock last backup time

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
    <SafeAreaView style={styles.container}>
      <View style={styles.lastBackupContainer}>
        <Text style={styles.label}>Last Backup Time:</Text>
        <Text style={styles.lastBackupText}>{lastBackupTime}</Text>
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
