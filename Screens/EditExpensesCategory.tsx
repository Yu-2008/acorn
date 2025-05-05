import React, { useState, useRef, useEffect } from "react";
import { EditExpensesCategoryStyles as styles } from '../Styles';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { ExpensesCategoryParamList } from "../Types";
import { StackScreenProps } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<ExpensesCategoryParamList, 'EditExpensesCategory'>;

const EditExpensesCategory = ({ route, navigation }: Props) => {
  const { expensesTitle, expensesDescription, expensesDate, expensesAmount } = route.params;

  const [title, setTitle] = useState(expensesTitle);
  const [description, setDescription] = useState(expensesDescription);
  const [amount, setAmount] = useState(expensesAmount.toString());
  const [date, setDate] = useState(new Date(expensesDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const shouldWarnOnLeave = useRef(true);

  const { theme } = useTheme();

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setIsEdited(true);
    }
  };

  // Handle Save
  const handleSave = () => {
    console.log("Save edited expenses category");
    if (!title.trim() || !amount.trim()) {
      Alert.alert("Validation Error", "Title and amount are required!");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      Alert.alert("Validation Error", "Amount must be a valid number.");
      return;
    }

    console.log("Saving:", title, description, numericAmount, date);
    shouldWarnOnLeave.current = false;
    setIsEdited(false);

    if (Platform.OS === 'android') {
      ToastAndroid.show("Category saved successfully", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Category saved successfully");
    }

    navigation.goBack();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!shouldWarnOnLeave.current) return;
      if (!isEdited) return;

      e.preventDefault();

      Alert.alert(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, isEdited]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Title</Text>
            <TextInput
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter category title"
            />

            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Description</Text>
            <TextInput
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter description"
            />

            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              keyboardType="numeric"
              placeholder="Enter amount"
            />

            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Date</Text>
            <TouchableOpacity
              style={[styles.datePickerButton, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: theme === 'dark' ? 'white' : 'black' }]}>{date.toDateString()}</Text>
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
              style={[styles.saveButton, { backgroundColor: isEdited ? '#E69DB8' : '#d3d3d3' }]}
              onPress={handleSave}
              disabled={!isEdited}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditExpensesCategory;
