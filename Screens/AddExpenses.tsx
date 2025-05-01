import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { AddExpensesStyles as styles } from '../Styles';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExpenses = ({ navigation }: any) => {
  const [category, setCategory] = useState('Lunch');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  {/**handle onPress */}
  const handleSave = () => {

    console.log("Add expenses transaction:" + { category, amount, date });
    navigation.goBack();
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Transportation" value="Transportation" />
          </Picker>
        </View>

        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.amountText}>RM</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleSave}
        >
          <Text style={styles.doneButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddExpenses;
