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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { updateTransactionById, getIncomeCategories, getExpensesCategories } from "../src/database/database";
import { Picker } from "@react-native-picker/picker";

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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(route.params.transCategory);


  const shouldWarnOnLeave = useRef(true);
  const { userID } = useUser();
  const { theme } = useTheme();

 

  const handleSave = async () => {


    if (!title.trim()) {
      Alert.alert("Input Error", "Transaction title is required!");
      return;
    }

    if (!selectedCategory || !title || !amount) {
          Alert.alert("Please fill in category, title, and amount.");
          return;
    }

    const parsedAmount = parseFloat(String(amount));
    if (isNaN(parsedAmount)) {
      Alert.alert("Please enter a valid amount.");
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
        description: description || "",
        location: transLocation || "",
      });
  
      shouldWarnOnLeave.current = false;
      setIsEdited(false);
  
      if (Platform.OS === 'android') {
        ToastAndroid.show("Transaction saved successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Transaction saved successfully");
      }
  
      setSelectedCategory(categories.length > 0 ? String(categories[0].id) : "");
      setTitle("");
      setAmount("");
      setDescription("");
      setDate(new Date());
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save transaction.");
      console.error(error);
    }
  };

  useEffect(()=>{

    if (!userID) {
      Alert.alert("Get UID Error", "Please check your sign in status.");
      return;
    }

    if(!transID){
      Alert.alert("Get transID error","Cannot save category.");
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
        setSelectedCategory(data[0].id);  // Ensure valid category selection
      }
    };
    
    loadCategories();
  }, [transID]);


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

            <Text style={[styles.label, { color: theme === 'dark' ? 'white' : 'black' }]}>Location (Not editable)</Text>
            <TextInput
              value={transLocation ?? "No location"}
              editable={false}
              style={[styles.input, { backgroundColor: theme === 'dark' ? '#444' : '#fff', color: theme === 'dark' ? 'white' : 'black' }]}
              placeholder="No location"
            />
            

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
