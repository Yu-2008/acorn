import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';


const AddExpenses = ({ navigation }: any) => {
  const [category, setCategory] = useState('Lunch');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleDone = () => {
    console.log({ category, amount, date });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F5F2', padding: 20 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 20 }}>
        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Category</Text>
        <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
            <Picker.Item label="Groceries" value="Groceries" />
            <Picker.Item label="Transportation" value="Transportation" />
          </Picker>
        </View>

        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Amount</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ fontSize: 16, color: 'black', marginRight: 5 }}>RM</Text>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10 }}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Date</Text>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 15, marginBottom: 20 }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: 'black' }}>{date.toDateString()}</Text>
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
          style={{ backgroundColor: '#65B4E0', padding: 15, borderRadius: 10, alignItems: 'center' }}
          onPress={handleDone}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddExpenses;
