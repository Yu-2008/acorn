import React, { useState, useContext } from "react";
import { AddIncomeCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { IncomeCategoryParamList } from "../Types";
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext'; 

type Props = StackScreenProps<IncomeCategoryParamList, 'AddIncomeCategory'>;

const AddIncomeCategory = ({ route, navigation }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("Salary");
  const [categoryName, setCategoryName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const { theme } = useTheme();

  {/**handle onPress */}
  const handleSave = () => {
    console.log("Add income category:", selectedIcon, categoryName);
    setConfirmationMessage(`Category '${selectedIcon}' saved successfully!`);
    navigation.goBack();
  };

  const iconOptions = [
    { label: "Salary", value: "Salary", icon: <Ionicons name="cash" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
    { label: "Side Income", value: "Side Income", icon: <FontAwesome name="usd" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
    { label: "Investments", value: "Investments", icon: <Ionicons name="trending-up" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
    { label: "Freelance", value: "Freelance", icon: <FontAwesome name="pencil" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
    { label: "Business", value: "Business", icon: <Ionicons name="briefcase" size={24} color={theme === 'dark' ? 'white' : '#393533'} /> },
  ];

  
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
      <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <View style={styles.formContainer}>
        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Select Icon</Text>
        <View style={styles.pickerContainer}>
          <FlatList
            data={iconOptions}
            renderItem={renderItem}
            keyExtractor={item => item.value}
          />
        </View>

        <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
          style={[styles.input, { color: theme === 'dark' ? 'white' : 'black' }]}  
          placeholderTextColor={theme === 'dark' ? 'lightgray' : '#aaa'}  
        />

        {confirmationMessage ? (
          <Text style={[styles.confirmationMessage,{color: theme === 'dark' ? '#8FF479' : 'green'}]}>{confirmationMessage}</Text> // Show confirmation message           
        ) : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIncomeCategory;
