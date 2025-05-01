import React, { useState,useContext } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { AddExpensesCategoryStyles as styles } from '../Styles';
import { useTheme } from '../ThemeContext';


type Props = StackScreenProps<ExpensesCategoryParamList, 'AddExpensesCategory'>;

const AddExpensesCategory = ({ route, navigation }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("Breakfast");
  const [categoryName, setCategoryName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { theme } = useTheme();
  // Array of icon options to display in the custom dropdown
  const iconOptions = [
    { label: "Medical", value: "Medical", icon: <Ionicons name="medkit" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
    { label: "Utilities", value: "Utilities", icon: <Ionicons name="flash" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
    { label: "Entertainment", value: "Entertainment", icon: <Ionicons name="film" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> }, 
    { label: "Shopping", value: "Shopping", icon: <Ionicons name="shirt" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
    { label: "Education", value: "Education", icon: <Ionicons name="school" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
    { label: "Miscellaneous", value: "Miscellaneous", icon: <Ionicons name="apps" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
    { label: "Housing", value: "Housing", icon: <Ionicons name="home" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> },
    { label: "Debt", value: "Debt", icon: <Ionicons name="card" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> }, 
    { label: "Insurance", value: "Insurance", icon: <Ionicons name="shield" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
    { label: "Savings", value: "Savings", icon: <Ionicons name="save" size={24} color={theme === 'dark' ? 'white' : '#393533'}  /> }, 
  ];
  
  {/**handle onPress */}
  const handleSave = () => {
    // Save logic here (send to database or update state)
    console.log("Add Expenses Category:", selectedIcon, categoryName);
    setConfirmationMessage(`Category '${selectedIcon}' saved successfully!`);
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: { value: string, label: string, icon: React.ReactNode } }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedIcon(item.value);
        setConfirmationMessage(`You selected ${item.label} icon!`);  
      }}
      style={[
        styles.itemRow,
        selectedIcon === item.value && styles.selectedItem,
        { backgroundColor: theme === 'dark' ? '#444' : '#FDE6F6' }
      ]}
    >
      {item.icon}
      <Text style={[styles.itemText,{ color: theme === 'dark' ? 'white' : 'black' }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container,{ backgroundColor: theme === 'dark' ? '#444' : '#FDE6F6' }]}>
      <View style={styles.formContainer}>
        <Text style={[styles.label,{ color: theme === 'dark' ? 'white' : 'black' }]}>Select Icon</Text>
        <View style={styles.pickerContainer}>
          <FlatList
            data={iconOptions}
            renderItem={renderItem}
            keyExtractor={item => item.value}
          />
        </View>

        <Text style={[styles.label,{ color: theme === 'dark' ? 'white' : 'black' }]}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]} 
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#aaa'} 
        />

        {confirmationMessage ? (
         <Text style={[styles.confirmationMessage,{color: theme === 'dark' ? '#8FF479' : 'green'}]}>{confirmationMessage}</Text>  // Show confirmation message
        ) : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddExpensesCategory;
