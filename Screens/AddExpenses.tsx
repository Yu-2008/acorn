import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, Alert, ScrollView, ActivityIndicator, ToastAndroid} from "react-native";
import { AddExpensesStyles as styles } from '../src/styles/Styles';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../src/contexts/ThemeContext';
import { getExpensesCategories, insertTransactionHistory } from "../src/database/database";
import { useUser } from "../src/contexts/UserContext";
import CheckBox from '@react-native-community/checkbox';
import Geolocation from "@react-native-community/geolocation";
import { usePubNub } from "pubnub-react";
import { useLocationPermission } from "../src/hooks/useLocationPermission";
import { reverseGeocode } from "../src/services/reverseGeocode";



const CHANNEL = "location-channel";

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
  const [location, setLocation] = useState<string>("Not showing location.");
  const { granted: hasLocationPerm, requestPermission } = useLocationPermission();
  const watchId = useRef<number | null>(null);
  const [ loading, setLoading ] = useState(false);
  
  // PubNub channel for location updates
  const pubnub = usePubNub();

   // Function to handle incoming messages with location data from PubNub
  const handlePubNubMessage = async (message: string) => {
    const match = message.match(/Lat:([\d.-]+),Lon:([\d.-]+)/);
    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
  
      const locationName = await reverseGeocode(lat, lon);
      console.log('User location:', locationName);
      setLocation(locationName || "Unknown location");
      setLoading(false);
    }
  };
  // Effect hook to subscribe to location updates from PubNub
  useEffect(() => {
    pubnub.subscribe({ channels: [CHANNEL], withPresence: false });
    // Listener for receiving location updates
    const listener = {
      message: (m: any) => {
        const rawLocation = m.message.locationName ?? "Unknown location";
        console.log("Received via PubNub:", rawLocation);
        handlePubNubMessage(rawLocation);
      }
    };
    pubnub.addListener(listener);

    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribe({ channels: [CHANNEL] });
    };
  }, [pubnub]);

    // Function to check location tracking on or off
  const onToggleLocation = async (checked: boolean) => {
    setLocationCheckbox(checked);
    if (!checked)  {
      stopWatchingLocation();
      setLocation("Not showing location.");
      return;
    }

    // request runtime permission on demand
    const ok = await requestPermission();
    if (!ok) {
      Alert.alert("Permission required", "Location permission not granted.");
      setLocationCheckbox(false);
      return;
    }

    setLoading(true);
    startWatchingLocation();
  };
  // Function to start watching the location in real-time
  const startWatchingLocation = () => {
    watchId.current = Geolocation.watchPosition(
      async ({ coords }) => {
        const name = `Lat:${coords.latitude.toFixed(4)},Lon:${coords.longitude.toFixed(4)}`;
        pubnub.publish({ channel: CHANNEL, message: { locationName: name } })
          .then(() => console.log("Published location:", name))
          .catch(err => console.error("Publish error:", err));
      },
      err => {
        console.error("Watch error:", err);
        setLoading(false);
      },
      { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
    );
  };
  // Function to stop watching the location
  const stopWatchingLocation = () => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  };
  
  useEffect(() => {
    return () => {
      stopWatchingLocation(); // Clear on unmount
    };
  }, []);
  
  

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
      setLocation("");
      setLocationCheckbox(false);
      navigation.goBack(); 
    } catch (error) {
      console.error("Add expenses transaction error: ", error);
      Alert.alert("Add expenses transaction failed", "Please try again.");
    }
  };


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


          
          {/* Location Toggle */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox value={locationCheckbox} onValueChange={onToggleLocation} />
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Record Current Location
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color={theme === 'dark' ? '#fff' : '#000'} />
          ) : (
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{locationCheckbox ? `Current Location: ${location} \n (Location are not editable once saved)` : "Not showing location."}</Text>
          )}


           {/* Submit Button */}
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
