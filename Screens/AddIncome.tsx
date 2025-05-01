import React, { useState } from "react";
import { AddIncomeStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const AddIncome = ({ navigation }: any) => {
  const [transCategory, setTransCategory] = useState('Cash');
  const [transAmount, setTransAmount] = useState('');
  const [transDate, setTransDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTransDate(selectedDate);
    }
  };

  const handleDone = () => {
    console.log({ transCategory, transAmount, transDate });
    navigation.goBack(); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={transCategory}
            onValueChange={(itemValue) => setTransCategory(itemValue)}
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Bank" value="Bank" />
            <Picker.Item label="Wallet" value="Wallet" />
          </Picker>
        </View>

        <Text style={styles.label}>Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.amountText}>RM</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={transAmount}
            onChangeText={setTransAmount}
          />
        </View>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>{transDate.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={transDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIncome;
