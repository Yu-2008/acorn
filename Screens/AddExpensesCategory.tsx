import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid
} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../src/types/Types";
import { AddExpensesCategoryStyles as styles } from '../src/styles/Styles';
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { insertExpensesCategory } from "../src/database/database";
import { GetIcon } from "../src/customComponent/CustomComponent";

type Props = StackScreenProps<ExpensesCategoryParamList, 'AddExpensesCategory'>;

const AddExpensesCategory = ({ route, navigation }: Props) => {
 // State hooks for managing form inputs
  const { userID } = useUser();
  const [iconName, setIconName] = useState("");
  const [iconLibrary, setIconLibrary] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { theme } = useTheme();

  // Function to save the new expense category
  const handleSave = async () => {

    if (!userID) {
      console.log("Get user ID failed.\nPlease sign in again.");
      return;
    }

    if (!categoryTitle.trim() || !iconName || !iconLibrary) {
      Alert.alert("Add expenses category failed", "Please select an icon and fill in Category Title.");
      return;
    }

    if (categoryTitle.trim().length > 30) {
      Alert.alert("Add expenses category failed", "Category Title must not exceed 30 characters.");
      return;
    }

    try {
      await insertExpensesCategory({
        title: categoryTitle,
        description: categoryDescription ? categoryDescription : "No description",
        expensesIconName: iconName,
        expensesIconLibrary: iconLibrary,
        userID: userID,
      });

      console.log('Inserting category:', {
        title: categoryTitle,
        description: categoryDescription,
        expensesIconName: iconName,
        expensesIconLibrary: iconLibrary,
        userID: userID,
      });

      if (Platform.OS === 'android') {
        ToastAndroid.show("Expenses category added successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Add success", "Expenses category added successfully");
      }
      // Navigate back to the previous screen after saving
      navigation.goBack();
    } catch (error) {
        console.log("Error saving expenses category:", error);
        Alert.alert("Add expenses category failed", "The expenses category's title is duplicated.\nPlease try again.")
    }
  };
  // Function to handle icon selection
  const handleSelectIcon = (item: { iconName: string; iconLibrary: string; label: string }) => {
    setIconName(item.iconName);
    setIconLibrary(item.iconLibrary);
    setConfirmationMessage(`You selected ${item.label} icon!`);
  }

   // List of available icons for the categories
  const iconOptions = [
    { label: "Food", iconName: "fast-food", iconLibrary: "Ionicons" },
    { label: "Utilities", iconName: "flash", iconLibrary: "Ionicons" },
    { label: "Entertainment", iconName: "game-controller", iconLibrary: "Ionicons" },
    { label: "Education", iconName: "school", iconLibrary: "Ionicons" },
    { label: "Childcare", iconName: "baby", iconLibrary: "FontAwesome5" },
    { label: "Clothing", iconName: "shirt", iconLibrary: "Ionicons" },
    { label: "Personal Care", iconName: "cut", iconLibrary: "Ionicons" },
    { label: "Transportation", iconName: "car", iconLibrary: "Ionicons" },
    { label: "Medication", iconName: "medkit", iconLibrary: "Ionicons" },
    { label: "Pets", iconName: "paw", iconLibrary: "FontAwesome5" },
    { label: "Travel", iconName: "airplane", iconLibrary: "Ionicons" },
    { label: "Subscription", iconName: "logo-youtube", iconLibrary: "Ionicons" },
    { label: "Others", iconName: "ellipsis-h", iconLibrary: "FontAwesome5" },
  ];

  const renderIcon = (iconName: string, iconLibrary: string) => {
    const color = theme === 'dark' ? 'white' : '#393533';
    const size = 24;

    return (
      <GetIcon
        library={iconLibrary as 'Ionicons' | 'FontAwesome' | 'FontAwesome5'}
        name={iconName}
        color={color}
        size={size}
      />
    );

  };

  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#444' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.formContainer}>
         {/* Icon selection section */}
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Select Icon</Text>
        
        <View style={styles.pickerContainer}>
          {iconOptions.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={()=>handleSelectIcon(item)}
              style={[
                styles.itemRow,
                iconName === item.iconName && iconLibrary === item.iconLibrary && styles.selectedItem,
                { backgroundColor: theme === 'dark' ? '#444' : '#FDE6F6' }
              ]}
            >
              {renderIcon(item.iconName, item.iconLibrary)}
              <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
         {/* Category title input */}
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Title</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryTitle}
          onChangeText={setCategoryTitle}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}  
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'}  
        />
         {/* Category description input */}
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Description (optional)</Text>
        <TextInput
          placeholder="Enter description"
          value={categoryDescription}
          onChangeText={setCategoryDescription}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]} 
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'} 
        />
         {/* Confirmation message for icon selection */}
        {confirmationMessage ? (
          <Text style={[styles.confirmationMessage, { color: theme === 'dark' ? '#8FF479' : 'green' }]}>
            {confirmationMessage}
          </Text>
        ) : null}

         {/* Save button */}
        <TouchableOpacity
            style={[
              styles.saveButton,
              { 
                backgroundColor: theme === 'dark' ? '#515151' : '#E69DB8',
                borderColor: theme === 'dark' ? '#E69DB8' : '#E69DB8', 
                borderWidth: 2,
              }
            ]}
            onPress={handleSave}
          >
            <Text style={[styles.saveButtonText,{color: theme === 'dark' ? '#fff' : '#000'}]}>
              Add
            </Text>
          </TouchableOpacity>

          

      </ScrollView>   
        
    </SafeAreaView>
  );
};

export default AddExpensesCategory;
