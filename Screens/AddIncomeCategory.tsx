import React, { useState } from "react";
import { 
  ScrollView, SafeAreaView, Text, View, TextInput, TouchableOpacity, 
  Alert,
  Platform,
  ToastAndroid
} from "react-native";
import { AddIncomeCategoryStyles as styles } from '../src/styles/Styles';
import { IncomeCategoryParamList } from "../src/types/Types";
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '../src/contexts/ThemeContext'; 
import { useUser } from "../src/contexts/UserContext";
import { insertIncomeCategory } from "../src/database/database";
import { GetIcon } from "../src/customComponent/CustomComponent";

type Props = StackScreenProps<IncomeCategoryParamList, 'AddIncomeCategory'>;

const AddIncomeCategory = ({ route, navigation }: Props) => {
  const { userID } = useUser();
  const [iconName, setIconName] = useState("");
  const [iconLibrary, setIconLibrary] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { theme } = useTheme();


  const handleSave = async () => {
    if (!categoryTitle.trim() || !iconName || !iconLibrary) {
      Alert.alert("Add income category failed", "Please select an icon and fill in Category Name.");
      return;
    }

    if (categoryTitle.trim().length > 30) {
      Alert.alert("Sign up failed", "Username must not exceed 30 characters.");
      return;
    }

    if (!userID) {
      Alert.alert("Get user ID failed", "User not signed in. Cannot get category.\nPlease sign in again.");
      return;
    }

    try {
      await insertIncomeCategory({
        title: categoryTitle,
        description: categoryDescription ? categoryDescription : "No description",
        incomeIconName: iconName,
        incomeIconLibrary: iconLibrary,
        userID: userID,
      });

      console.log('Inserting category:', {
        title: categoryTitle,
        description: categoryDescription,
        incomeIconName: iconName,
        incomeIconLibrary: iconLibrary,
        userID: userID,
      });

      if (Platform.OS === "android") {
        ToastAndroid.show("New income category is added succcessfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Added success", "New income category is added succcessfully.");
      }
      
      navigation.goBack();
    } catch (error) {
      console.log("Error saving income category:", error);
      Alert.alert("Add new income category failed", "The income category's title is duplicated.\nPlease try again. ")
    }
  };
  // icon selection from the list of options
  const handleSelectIcon = (item: { iconName: string; iconLibrary: string; label: string }) => {
    setIconName(item.iconName);
    setIconLibrary(item.iconLibrary);
    setConfirmationMessage(`You selected ${item.label} icon!`);
  }
   // List of available icon options for the income categories
  const iconOptions = [
    { label: "Salary", iconName: "wallet", iconLibrary: "Ionicons" },
    { label: "Side Income", iconName: "cash", iconLibrary: "Ionicons" },
    { label: "Freelancing", iconName: "laptop", iconLibrary: "Ionicons" },
    { label: "Investment", iconName: "chart-line", iconLibrary: "FontAwesome5" },
    { label: "Gifts", iconName: "gift", iconLibrary: "Ionicons"},
    { label: "Dividend", iconName: "money-bill-wave", iconLibrary: "FontAwesome5" },
    { label: "Government Aid", iconName: "business", iconLibrary: "Ionicons" },
    { label: "Scholarship", iconName: "ribbon", iconLibrary: "Ionicons" },
    { label: "Tips", iconName: "thumbs-up", iconLibrary: "Ionicons" },
    { label: "Intellectual Property", iconName: "bulb", iconLibrary: "Ionicons" },
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Icon Selection */}
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
        {/* Category Title Input */}
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryTitle}
          onChangeText={setCategoryTitle}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}  
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'}  
        />
        {/* Description Input */}
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Description (optional)</Text>
        <TextInput
          placeholder="Enter description"
          value={categoryDescription}
          onChangeText={setCategoryDescription}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]} 
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#6E6E6E'} 
        />
         {/* Display Confirmation Message for selected icon */}
        {confirmationMessage ? (
          <Text style={[styles.confirmationMessage, { color: theme === 'dark' ? '#8FF479' : 'green' }]}>
            {confirmationMessage}
          </Text>
        ) : null}
         {/* Save Button */}
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

export default AddIncomeCategory;
