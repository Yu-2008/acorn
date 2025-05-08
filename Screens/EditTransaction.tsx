import React, { useState, useRef, useEffect} from "react";
import { EditTransactionStyles as styles } from '../src/styles/Styles';
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
import { MainStackParamList } from "../src/types/Types";
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { updateTransactionById, getIncomeCategories, getExpensesCategories } from "../src/database/database";
import { Picker } from "@react-native-picker/picker";
import { CalenderPicker } from "../src/customComponent/CustomComponent";


type Props = StackScreenProps<MainStackParamList, "EditTransaction">;

const EditTransaction = ({ route, navigation }: Props) => {
  const { transID, transLocation }= route.params;
  const [title, setTitle] = useState(route.params.transTitle);
  const [type, setType] = useState(route.params.transType);
  const [description, setDescription] = useState(route.params.transDescription);
  const [date, setDate] = useState<Date>(new Date(route.params.transDate));
  const [amount, setAmount] = useState(String(route.params.transAmount));
  const [categories, setCategories] = useState<{ id: number; title: string }[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(route.params.transCategory);


  const shouldWarnOnLeave = useRef(true);
  const { userID } = useUser();
  const { theme } = useTheme();

 
  // Handle save
  const handleSave = async () => {


    if (!selectedCategory || !title.trim() || !amount) {
      Alert.alert("Update transaction failed", "Please fill in category, title, and amount.");
      return;
    }
     // Ensure the title doesn't exceed character limit
    if (title.trim().length > 30) {
      Alert.alert("Update transaction failed", "Title must not exceed 30 characters.");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      Alert.alert("Update transaction failed", "Title must not exceed 30 characters.");
      return;
    }
  
    try {
      await updateTransactionById({
        transID,
        transType: type,
        transCategory: selectedCategory,
        transTitle: title,
        transactionDate: date.getTime(), // converting Date object to timestamp
        amount: parsedAmount,
        description: description || "No description",
        location: transLocation || "No location",
      });
  
      shouldWarnOnLeave.current = false;
      setIsEdited(false);
  
      // Provide feedback to the user 
      if (Platform.OS === 'android') {
        ToastAndroid.show("Transaction updated successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Update success", "Transaction updated successfully");
      }
  
      setSelectedCategory(categories.length > 0 ? String(categories[0].id) : "");
      setTitle("");
      setAmount("");
      setDescription("");
      setDate(new Date());
      navigation.goBack();
    } catch (error) {
      Alert.alert("Updated transaction failed", "Please try again.");
      console.log(error);
    }
  };

  useEffect(()=>{

    if (!userID) {
      Alert.alert("Get user ID failed", "Please sign in again.");
      return;
    }

    if(!transID){
      Alert.alert("Get transID failed","Please try again.");
      return;
    }

    const loadCategories = async () => {
      let data = [];
      if (type === 0) {
        data = await getIncomeCategories(userID);
      } else {
        data = await getExpensesCategories(userID);
      }
      setCategories(data);
      
      if (!data.find((cat) => cat.id === selectedCategory) && data.length > 0) {
        setSelectedCategory(data[0].id);  
      }
    };
    
    loadCategories();
  }, [transID]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!shouldWarnOnLeave.current) return;

      if (!isEdited) return;

      e.preventDefault();
      // Show a confirmation message to the user
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
  // Handle date picker changes
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      setIsEdited(true);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={styles.formContainer}>
            {/* Transaction Type (Non-editable) */}
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Transaction Type (No editable)</Text>
              <View style={[styles.detailBox, { marginBottom: 20, backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
                {type===0? 
                  <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                    Income
                  </Text>
                :
                  <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                    Expenses
                  </Text>}
                </View>

                {/* Title Input */}              
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Title</Text>
            <TextInput
              value={title ?? ""}
              onChangeText={(text) => {
                setTitle(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter transaction name"
            />
            {/* Category Picker */}
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
                  onValueChange={(itemValue) => {setSelectedCategory(itemValue); setIsEdited(true);}}
                  style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
                  ))}
                </Picker>
              </View>

            </View>
             {/* Date Picker */}
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Date</Text>
            <CalenderPicker
              date={date}
              show={showDatePicker}
              setShow={setShowDatePicker}
              onChange={onChangeDate}
              theme={theme}
              style={{
              datePickerButton: styles.datePickerButton,
              dateText: styles.dateText
              }}
            />
             {/* Amount Input */}
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Amount</Text>
            <TextInput
              value={String(amount ?? "")}
              onChangeText={(text) => {
                setAmount(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
            {/* Description Input */}
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Description (Optional)</Text>
            <TextInput
              value={description ?? "No description"}
              onChangeText={(text) => {
                setDescription(text);
                setIsEdited(true);
              }}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="Enter description"
            />
            {/* Location */}
            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Location (Not editable)</Text>
            <TextInput
              value={transLocation ?? "No location"}
              editable={false}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="No location"
            />
            
             {/* Save Button */}
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
