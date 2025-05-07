import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AddExpensesCategoryStyles as styles } from '../Styles';
import { useTheme } from '../ThemeContext';
import { useUser } from "../UserContext";
import { insertExpensesCategory } from "../SQLite";

type Props = StackScreenProps<ExpensesCategoryParamList, 'AddExpensesCategory'>;

const AddExpensesCategory = ({ route, navigation }: Props) => {
  const { userID } = useUser();
  const [iconName, setIconName] = useState("");
  const [iconLibrary, setIconLibrary] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { theme } = useTheme();


  const handleSave = async () => {
    if (!categoryName || !iconName || !iconLibrary) {
      setConfirmationMessage("Please make sure your are already select an icon and fill in Category Name.");
      return;
    }

    if (!userID) {
      setConfirmationMessage("User not signed in. Cannot save category.");
      return;
    }

    try {
      await insertExpensesCategory({
        title: categoryName,
        description: categoryDescription,
        expensesIconName: iconName,
        expensesIconLibrary: iconLibrary,
        userID: userID,
      });
      setConfirmationMessage(`Category '${categoryName}' saved successfully!`);

      console.log('Inserting category:', {
        title: categoryName,
        description: categoryDescription,
        expensesIconName: iconName,
        expensesIconLibrary: iconLibrary,
        userID: userID,
      });
      
      navigation.goBack();
    } catch (error) {
        console.log("Error saving expenses category:", error);
        setConfirmationMessage("Failed to save category.");
    }
  };
  const handleSelectIcon = (item: { iconName: string; iconLibrary: string; label: string }) => {
    setIconName(item.iconName);
    setIconLibrary(item.iconLibrary);
    setConfirmationMessage(`You selected ${item.label} icon!`);
  }

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

    if (iconLibrary === 'Ionicons') {
      return <Ionicons name={iconName} size={24} color={color}  />;
    } else if (iconLibrary === 'FontAwesome') {
      return <FontAwesome name={iconName} size={24} color={color}  />;
    } else if (iconLibrary === 'FontAwesome5') {
      return <FontAwesome5 name={iconName} size={24} color={color}  />;
    } else {
      return <Ionicons name="file-tray" size={24} color={color} />;
    }

  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#444' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.formContainer}>

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

        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}  
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'}  
        />

        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Description (optional)</Text>
        <TextInput
          placeholder="Enter description"
          value={categoryDescription}
          onChangeText={setCategoryDescription}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]} 
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'} 
        />

        {confirmationMessage ? (
          <Text style={[styles.confirmationMessage, { color: theme === 'dark' ? '#8FF479' : 'green' }]}>
            {confirmationMessage}
          </Text>
        ) : null}

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
