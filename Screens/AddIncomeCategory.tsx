import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import type { StackScreenProps } from "@react-navigation/stack";
import { IncomeCategoryParamList } from "../Types";

type Props = StackScreenProps<IncomeCategoryParamList, 'AddIncomeCategory'>;

const AddIncomeCategory = ({ route, navigation }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState("Icon 1");
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    // Save logic here (send to database or update state)
    console.log("Saving:", selectedIcon, categoryName);
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Icon</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedIcon}
            onValueChange={(itemValue) => setSelectedIcon(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Icon 1" value="Icon 1" />
            <Picker.Item label="Icon 2" value="Icon 2" />
            <Picker.Item label="Icon 3" value="Icon 3" />
          </Picker>
        </View>

        <Text style={styles.label}>Category</Text>
        <TextInput
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={setCategoryName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#65B4E0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default AddIncomeCategory;
