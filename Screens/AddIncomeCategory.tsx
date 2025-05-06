import React, { useState } from "react";
import { 
  ScrollView, SafeAreaView, Text, View, TextInput, TouchableOpacity 
} from "react-native";
import { AddIncomeCategoryStyles as styles } from '../Styles';
import { IncomeCategoryParamList } from "../Types";
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext'; 
import { useUser } from "../UserContext";
import { insertIncomeCategory } from "../SQLite";

type Props = StackScreenProps<IncomeCategoryParamList, 'AddIncomeCategory'>;

const AddIncomeCategory = ({ route, navigation }: Props) => {
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
      await insertIncomeCategory({
        title: categoryName,
        description: categoryDescription,
        incomeIconName: iconName,
        incomeIconLibrary: iconLibrary,
        userID: userID,
      });
      setConfirmationMessage(`Category '${categoryName}' saved successfully!`);

      console.log('Inserting category:', {
        title: categoryName,
        description: categoryDescription,
        incomeIconName: iconName,
        incomeIconLibrary: iconLibrary,
        userID: userID,
      });
      
      navigation.goBack();
    } catch (error) {
      console.log("Error saving income category:", error);
      setConfirmationMessage("Failed to save category.");
    }
  };

  const handleSelectIcon = (item: { iconName: string; iconLibrary: string; label: string }) => {
    setIconName(item.iconName);
    setIconLibrary(item.iconLibrary);
    setConfirmationMessage(`You selected ${item.label} icon!`);
  }

  const iconOptions = [
    { label: "Salary", iconName: "wallet", iconLibrary: "Ionicons" },
    { label: "Side Income", iconName: "cash", iconLibrary: "Ionicons" },
    { label: "Freelancing", iconName: "laptop", iconLibrary: "Ionicons" },
    { label: "Investment", iconName: "chart-line", iconLibrary: "FontAwesome5" },
    { label: "Gifts", iconName: "gift", iconLibrary: "Ionicons"},
    { label: "Dividents", iconName: "money-bill-wave", iconLibrary: "FontAwesome5" },
    { label: "Government Aid", iconName: "business", iconLibrary: "Ionicons" },
    { label: "Scholarship", iconName: "ribbon", iconLibrary: "Ionicons" },
    { label: "Tips", iconName: "thumbs-up", iconLibrary: "Ionicons" },
    { label: "Intellectual Property", iconName: "bulb", iconLibrary: "Ionicons" },
    { label: "Others", iconName: "ellipsis-h", iconLibrary: "FontAwesome5" },
  ];

  const renderIcon = (iconName: string, iconLibrary: string) => {
    const color = theme === 'dark' ? 'white' : '#393533';
    const size = 24;

    if (iconLibrary === "Ionicons") {
      return <Ionicons name={iconName} size={size} color={color} />;
    } else if (iconLibrary === "FontAwesome") {
      return <FontAwesome name={iconName} size={size} color={color} />;
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AddIncomeCategory;
