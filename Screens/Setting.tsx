import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { SettingStackParamList } from "../Types";

type SettingScreenNavigationProp = StackNavigationProp<SettingStackParamList, 'Settings'>;

type Props = {
  navigation: SettingScreenNavigationProp;
  onSignOut: () => void;
  userName: string;
};

const Setting = ({ navigation, onSignOut, userName }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Categories</Text>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoExpensesCategory')}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.rowText}>Expenses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoIncomeCategory')}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.rowText}>Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity 
          style={styles.row}
          onPress={() => navigation.navigate('GoBackUpCloud')}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.rowText}>Backup to Cloud</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.row}
          onPress={onSignOut}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.rowText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8DD',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    color: 'black',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginRight: 20,
  },
  rowText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Setting;
