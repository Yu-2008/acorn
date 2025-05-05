import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { AddIncomeStyles as styles } from '../Styles';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../ThemeContext';

const AddIncome = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [transCategory, setTransCategory] = useState('Cash');
  const [transAmount, setTransAmount] = useState('');
  const [transDate, setTransDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle onPress
  const handleSave = () => {
    console.log("Add income transaction: ", { transCategory, transAmount, transDate });
    navigation.goBack(); 
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTransDate(selectedDate);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }, 
      ]}
    >
      <View style={styles.formContainer}>
        <Text
          style={[
            styles.label,
            { color: theme === 'dark' ? '#fff' : '#000' }, 
          ]}
        >
          Category
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={transCategory}
            onValueChange={(itemValue) => setTransCategory(itemValue)}
            style={{ color: theme === 'dark' ? '#fff' : '#000' }} 
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Bank" value="Bank" />
            <Picker.Item label="Wallet" value="Wallet" />
          </Picker>
        </View>

        <Text
          style={[
            styles.label,
            { color: theme === 'dark' ? '#fff' : '#000' }, 
          ]}
        >
          Amount
        </Text>
        <View style={styles.inputContainer}>
          <Text style={[styles.amountText, { color: theme === 'dark' ? '#fff' : '#000' }]}>RM</Text>
          <TextInput
            style={[
              styles.textInput,
              { color: theme === 'dark' ? '#fff' : '#000' }
            ]}
            keyboardType="numeric"
            value={transAmount}
            onChangeText={setTransAmount}
          />
        </View>

        <Text
          style={[
            styles.label,
            { color: theme === 'dark' ? '#fff' : '#000' }, 
          ]}
        >
          Date
        </Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={[styles.dateText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            {transDate.toDateString()}
          </Text>
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
          style={[styles.doneButton]}
          onPress={handleSave}
        >
          <Text style={[styles.doneButtonText]}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddIncome;
