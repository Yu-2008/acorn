import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, Alert, ScrollView } from "react-native";
import { AddExpensesStyles as styles } from '../Styles';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../ThemeContext';
import { getExpensesCategories, insertTransactionHistory } from "../SQLite";
import { useUser } from "../UserContext";

const AddExpenses = ({ navigation }: any) => {
  const { userID } = useUser();
  const { theme } = useTheme();
  const [categories, setCategories] = useState<{ id: number; title: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [transTitle, setTransTitle] = useState("");
  const [transAmount, setTransAmount] = useState("");
  const [transDate, setTransDate] = useState(new Date());
  const [transDescription, setTransDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  {/**handle onPress */}
  const handleSave = async() => {
    if (!userID) {
      Alert.alert("User not signed in. Cannot add transaction.");
      return;
    }
    
    if (!selectedCategory || !transTitle || !transAmount) {
      Alert.alert("Please fill in category, title, and amount.");
      return;
    }

    const amount = parseFloat(transAmount);
    if (isNaN(amount)) {
      Alert.alert("Please enter a valid amount.");
      return;
    }

    try {
      await insertTransactionHistory({
        transType: 1, 
        transCategory: selectedCategory ? selectedCategory.toString() : "",
        transTitle: transTitle,
        transactionDate: transDate.getTime(), // timestamp
        amount: amount,
        description: transDescription || 'No description', // Optional description, can be added if needed
        userID,
      });
      console.log("Expenses added successfully.");
      setSelectedCategory(categories.length > 0 ? categories[0].id : null);
      setTransTitle("");
      setTransAmount("");
      setTransDescription("");
      setTransDate(new Date());
      navigation.goBack(); 
    } catch (error) {
      console.error("Add expenses transaction error: ", error);
    }
  };

  useEffect(() => {
    if (!userID) {
      Alert.alert("User not signed in. Cannot save category.");
      return;
    }
    const loadCategories = async () => {
      const data = await getExpensesCategories(userID);
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].id);
    };
    loadCategories();
  }, [userID]);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTransDate(selectedDate);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
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
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={{ color: theme === 'dark' ? '#fff' : '#000' }}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
              ))}
            </Picker>
          </View>

          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Title
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="e.g. from Boss"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              value={transTitle}
              onChangeText={setTransTitle}
            />
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

          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Description
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="Bonus!"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              value={transDescription}
              onChangeText={setTransDescription}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenses;
