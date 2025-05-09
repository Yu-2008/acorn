import React, { useEffect,  useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, Alert, ScrollView, ActivityIndicator, ToastAndroid} from "react-native";
import { AddExpensesStyles as styles } from '../src/styles/Styles';
import { useTheme } from '../src/contexts/ThemeContext';
import { getExpensesCategories, insertTransactionHistory } from "../src/database/database";
import { useUser } from "../src/contexts/UserContext";
import CheckBox from '@react-native-community/checkbox';
import { CalendarPicker, CategoryPicker } from "../src/customComponent/CustomComponent";
import { useLocationTracking } from "../src/hooks/useLocationTracking";


// Declare state variables for form inputs and location tracking
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
  const [locationCheckbox, setLocationCheckbox] = useState(false);
  const { location, loading, locationEnabled, toggleLocation } = useLocationTracking();
 

  {/**handle onPress */}
  const handleSave = async() => {
    if (!userID) {
      Alert.alert("Add transaction failed", "Cannot get user ID. Please sign in again.");
      return;
    }
    
    if (!selectedCategory || !transTitle.trim() || !transAmount) {
      Alert.alert("Add transaction failed", "Please fill in category, title, and amount.");
      return;
    }

    if (transTitle.trim().length > 30) {
      Alert.alert("Add transaction failed", "Title must not exceed 30 characters.");
      return;
    }

    const amount = parseFloat(transAmount);
    if (isNaN(amount)) {
      Alert.alert("Add transaction failed", "Please enter a valid amount.");
      return;
    }
    
    if (amount < 0) {
      Alert.alert("Add transaction failed","Amount cannot be negative.\nPlease input a positive amount.")
      return;
    }

    try {
      await insertTransactionHistory({
        transType: 1, 
        transCategory: selectedCategory ? selectedCategory.toString() : "",
        transTitle: transTitle,
        transactionDate: transDate.getTime(), // timestamp
        amount: amount,
        description: transDescription ? transDescription : "No description", 
        location: locationCheckbox ? location : "No location",
        userID,
      });
      console.log("Expenses added successfully.");

      if (Platform.OS === 'android') {
        ToastAndroid.show("Transaction added successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Add success", "Transaction added successfully");
      }

      setSelectedCategory(categories.length > 0 ? categories[0].id : null);
      setTransTitle("");
      setTransAmount("");
      setTransDescription("");
      setTransDate(new Date());
      setLocationCheckbox(false);
      toggleLocation(false);
      
      if (Platform.OS === 'android') {
        ToastAndroid.show("Transaction added successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Add success", "Transaction added successfully");
      }

      navigation.goBack(); 
    } catch (error) {
      console.log("Add expenses transaction error: ", error);
      Alert.alert("Add expenses transaction failed", "Please try again.");
    }
  };

  // load categories
  useEffect(() => {
    if (!userID) {
      console.log("Get user ID failed.\nPlease sign in again.");
      return;
    }
    const loadCategories = async () => {
      const data = await getExpensesCategories(userID);
      setCategories(data);
      if (data.length > 0) setSelectedCategory(data[0].id);
    };
    loadCategories();
  }, [userID]);

  // Handle date changes
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTransDate(selectedDate);
    }
  };

  const onToggleLocation = async (checked: boolean) => {
    setLocationCheckbox(checked);
    if (!checked) {
      toggleLocation(false);  // stop
      return;
    }
    toggleLocation(true);  // start
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
          <CategoryPicker
            categories={categories}
            selectedCategory={selectedCategory ?? undefined}
            onValueChange={(val) => setSelectedCategory(val)}
            theme={theme}
            style={{
              label: styles.label,
              pickerContainer: styles.pickerContainer,
            }}
          />


          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Title
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="e.g. Breakfast"
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
            Description (Optional)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="Yummy!!"
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
          <CalendarPicker
            date={transDate}
            show={showDatePicker}
            setShow={setShowDatePicker}
            onChange={onChangeDate}
            theme={theme}
            style={{
            datePickerButton: styles.datePickerButton,
            dateText: styles.dateText
            }}
          />
          
           {/* Location Toggle */}
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox value={locationCheckbox} onValueChange={onToggleLocation} />
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Record Current Location</Text>
          </View>
          {(loading) ? (
            <ActivityIndicator size="small" color={theme === 'dark' ? '#fff' : '#000'} />
          ) : (
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{locationCheckbox ? `Current Location: ${location}\n(Location cannot be edited once saved)` : "Not showing location."}</Text>
          )}

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              { 
                backgroundColor: theme === 'dark' ? '#515151' : '#E69DB8',
                borderColor: theme === 'dark' ? '#E69DB8' : '#E69DB8', 
                borderWidth: 2,
              }
            ]}
            onPress={handleSave}
          >
            <Text style={[styles.saveButtonText,{color: theme === 'dark' ? '#fff' : '#000'}]}>
              Add
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpenses;
