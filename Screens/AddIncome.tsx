import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, Alert, ScrollView, ActivityIndicator, ToastAndroid } from "react-native";
import { AddIncomeStyles as styles } from '../src/styles/Styles';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../src/contexts/ThemeContext';
import { getIncomeCategories, insertTransactionHistory } from "../src/database/database";
import { useUser } from "../src/contexts/UserContext";
import CheckBox from '@react-native-community/checkbox';
import Geolocation from "@react-native-community/geolocation";
import { usePubNub } from "pubnub-react";
import { useLocationPermission } from "../src/hooks/useLocationPermission";
import { reverseGeocode } from "../src/services/reverseGeocode";
import { CalenderPicker, CategoryPicker } from "../src/customComponent/CustomComponent";

// PubNub channel for location updates
const CHANNEL = "location-channel";

const AddIncome = ({ navigation }: any) => {
 // Retrieve user ID and theme from context
  const { userID } = useUser();
  const { theme } = useTheme();
  // State variables for handling income details and location
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

  const pubnub = usePubNub();

  // Handle received location data from PubNub
  const handlePubNubMessage = async (message: string) => {
      try {
        const match = message.match(/Lat:([\d.-]+),Lon:([\d.-]+)/);
        if (!match) {
          console.warn("Invalid message format:", message);
          setLocation("Unknown location");
          return;
        }
    
        const lat = parseFloat(match[1]);
        const lon = parseFloat(match[2]);
        const locationName = await reverseGeocode(lat, lon);
    
        if (!locationName) {
          console.warn("Reverse geocoding failed for:", lat, lon);
          setLocation("Unknown location");
        } else {
          console.log("User location:", locationName);
          setLocation(locationName);
        }
      } catch (error) {
        console.error("Error handling PubNub message:", error);
        setLocation("Unknown location");
      } finally {
        setLoading(false);
      }
    };
  // Subscribe to location updates via PubNub
  useEffect(() => {
    pubnub.subscribe({ channels: [CHANNEL], withPresence: false });

    const listener = {
      message: (m: any) => {
        try {
          const rawLocation = m?.message?.locationName ?? "Unknown location";
          console.log("Received via PubNub:", rawLocation);
          handlePubNubMessage(rawLocation);
        } catch (error) {
          console.error("PubNub listener error:", error);
        }
      },
    };

    pubnub.addListener(listener);

    return () => {
      pubnub.removeListener(listener);
      pubnub.unsubscribe({ channels: [CHANNEL] });
    };
  }, [pubnub]);


  const onToggleLocation = async (checked: boolean) => {
    setLocationCheckbox(checked);
  
    if (!checked) {
      stopWatchingLocation();
      setLocation("Not showing location.");
      return;
    }
  
    const permissionGranted = await requestPermission();
    if (!permissionGranted) {
      Alert.alert("Permission required", "Location permission not granted.");
      setLocationCheckbox(false);
      return;
    }
  
    setLoading(true);
    startWatchingLocation();
  };

  const startWatchingLocation = () => {
    watchId.current = Geolocation.watchPosition(
      async ({ coords }) => {
        try {
          const formatted = `Lat:${coords.latitude.toFixed(4)},Lon:${coords.longitude.toFixed(4)}`;
          await pubnub.publish({
            channel: CHANNEL,
            message: { locationName: formatted },
          });
          console.log("Published location:", formatted);
        } catch (err) {
          console.error("PubNub publish error:", err);
        }
      },
      (error) => {
        console.error("Geolocation watch error:", error);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
      }
    );
  };
    
  
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
  
  

  // Handle onPress
  const handleSave = async () => {
    if (!userID) {
      Alert.alert("Add transaction failed", "Cannot get user ID. Please sign in again.");
      return;
    }
    // Validate form inputs
    if (!selectedCategory || !transTitle.trim() || !transAmount) {
      Alert.alert("Add transaction failed", "Please fill in category, title, and amount.");
      return;
    }
     // Title length validation
    if (transTitle.trim().length > 30) {
      Alert.alert("Add transaction failed", "Title must not exceed 30 characters.");
      return;
    }
    // Validate the amount input
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
        transType: 0, 
        transCategory: selectedCategory ? selectedCategory.toString() : "",
        transTitle: transTitle,
        transactionDate: transDate.getTime(), // timestamp
        amount: amount,
        description: transDescription ? transDescription : "No description", 
        location: locationCheckbox ? location : "No location",
        userID,
      });
      console.log("Income added successfully.");
      setSelectedCategory(categories.length > 0 ? categories[0].id : null);
      setTransTitle("");
      setTransAmount("");
      setTransDescription("");
      setTransDate(new Date());
      setLocation("");
      setLocationCheckbox(false);

      if (Platform.OS === 'android') {
        ToastAndroid.show("Transaction added successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Add success", "Transaction added successfully");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Add income transaction error: ", error);
      Alert.alert("Add expenses category failed", "Please try again.")
    }
  };

  useEffect(() => {
    if (!userID) {
      console.error("Get user ID failed", "User is not signed in. Cannot get income category.\nPlease sign in again.");
      return;
    }
    const loadCategories = async () => {
      const data = await getIncomeCategories(userID);
      console.log("Fetched income categories:", data);
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          {/* Category Picker */}
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

          {/* Title Input */}
          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Title
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="e.g. Bonus"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              value={transTitle}
              onChangeText={setTransTitle}
            />
          </View>
          {/* Amount Input */}
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
          {/* Description Input */}
          <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Description (Optional)
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, { color: theme === 'dark' ? '#fff' : '#000' }]}
              placeholder="Get from dad"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              value={transDescription}
              onChangeText={setTransDescription}
            />
          </View>
           {/* Date Picker */}
          <Text
            style={[
              styles.label,
              { color: theme === 'dark' ? '#fff' : '#000' },
            ]}
          >
            Date
          </Text>
          <CalenderPicker
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
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Record Current Location
            </Text>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color={theme === 'dark' ? '#fff' : '#000'} />
          ) : (
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{locationCheckbox ? `Current Location: ${location}` : "Not showing location."}</Text>
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

export default AddIncome;