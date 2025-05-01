import React, { useState } from "react";
import { AddIncomeCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { IncomeCategoryParamList } from "../Types";
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 

type Props = StackScreenProps<IncomeCategoryParamList, 'AddIncomeCategory'>;

const AddIncomeCategory = ({ route, navigation }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("Salary");
  const [categoryName, setCategoryName] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  {/**handle onPress */}
  const handleSave = () => {
    console.log("Add income category:", selectedIcon, categoryName);
    setConfirmationMessage(`Category '${selectedIcon}' saved successfully!`);
    navigation.goBack();
  };

  const iconOptions = [
    { label: "Salary", value: "Salary", icon: <Ionicons name="cash" size={24} color="#393533" /> },
    { label: "Side Income", value: "Side Income", icon: <FontAwesome name="usd" size={24} color="#393533" /> },
    { label: "Investments", value: "Investments", icon: <Ionicons name="trending-up" size={24} color="#393533" /> },
    { label: "Freelance", value: "Freelance", icon: <FontAwesome name="pencil" size={24} color="#393533" /> },
    { label: "Business", value: "Business", icon: <Ionicons name="briefcase" size={24} color="#393533" /> },
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
      ]}
    >
      {item.icon}
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Select Icon</Text>
        <View style={styles.pickerContainer}>
          <FlatList
            data={iconOptions}
            renderItem={renderItem}
            keyExtractor={item => item.value}
          />
        </View>

        <Text style={styles.label}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
          style={styles.input}
        />

        {confirmationMessage ? (
          <Text style={styles.confirmationMessage}>{confirmationMessage}</Text>  // Show confirmation message
        ) : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIncomeCategory;
