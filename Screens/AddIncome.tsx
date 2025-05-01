import React, { useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform } from "react-native";
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5E8DD', padding: 20 }}>
      <View>
        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Category</Text>
        <View style={{ borderWidth: 3, borderColor: '#FFD0C7', borderRadius: 10, marginBottom: 15 }}>
          <Picker
            selectedValue={transCategory}
            onValueChange={(itemValue) => setTransCategory(itemValue)}
          >
            <Picker.Item label="Cash" value="Cash" />
            <Picker.Item label="Bank" value="Bank" />
            <Picker.Item label="Wallet" value="Wallet" />
          </Picker>
        </View>
        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Amount</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <Text style={{ fontSize: 16, color: 'black', marginRight: 5 }}>RM</Text>
          <TextInput
            style={{ flex: 1, borderWidth: 3, borderColor: '#FFD0C7', borderRadius: 5, paddingHorizontal: 10 }}
            keyboardType="numeric"
            value={transAmount}
            onChangeText={setTransAmount}
          />
        </View>
        <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>Date</Text>
        <TouchableOpacity
          style={{ borderWidth: 3, borderColor: '#FFD0C7', borderRadius: 5, padding: 15, marginBottom: 20 }}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: 'black' }}>{transDate.toDateString()}</Text>
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
          style={{ backgroundColor: '#E69DB8', padding: 15, borderRadius: 10, alignItems: 'center' }}
          onPress={handleDone}
        >
          <Text style={{ fontWeight: 'bold', color: 'black' }}>Add</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default AddIncome;
