import React, { useState, useRef, useEffect, useContext } from "react";
import { EditTransactionStyles as styles } from '../Styles';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from "../Types";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<MainStackParamList, "EditTransaction">;

const EditTransaction = ({ route, navigation }: Props) => {
  const { transTitle, transDate, transType, transAmount } = route.params;

  const [title, setTitle] = useState(transTitle);
  const [type, setType] = useState(transType);
  const [amount, setAmount] = useState(transAmount.toString());
  const [date, setDate] = useState(new Date(transDate));
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

  const handleSave = () => {
    console.log("Save edited transaction:", title, type, amount, date);
    shouldWarnOnLeave.current = false;
    setIsEdited(false);

    if (Platform.OS === 'android') {
      ToastAndroid.show("Transaction saved successfully", ToastAndroid.SHORT);
    } else {
      Alert.alert("Success", "Transaction saved successfully");
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
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Transaction Title</Text>
            <TextInput
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter transaction title"
            />

            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Transaction Type</Text>
            <TextInput
              value={type}
              onChangeText={(text) => {
                setType(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter transaction type"
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

export default EditTransaction;
