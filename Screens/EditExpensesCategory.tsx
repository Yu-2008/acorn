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
import { updateExpensesCategory } from "../SQLite";

type Props = StackScreenProps<ExpensesCategoryParamList, 'EditExpensesCategory'>;

const EditExpensesCategory = ({ route, navigation }: Props) => {
  const { expensesID, expensesTitle, expensesDescription } = route.params;
  const [id, setID] = useState(expensesID);
  const [title, setTitle] = useState(expensesTitle);
  const [description, setDescription] = useState(expensesDescription);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const shouldWarnOnLeave = useRef(true);
  const { theme } = useTheme();



  // Handle Save
  const handleSave = async() => {
    console.log("Save edited expenses category");
    if (!title.trim() ) {
      Alert.alert("Validation Error", "Title are required!");
      return;
    }

    try {
      await updateExpensesCategory({id, title, description});
      shouldWarnOnLeave.current = false;
      setIsEdited(false);
  
      if (Platform.OS === "android") {
        ToastAndroid.show("Expenses category details updated successfully", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Expenses category details updated successfully");
      }
  
      navigation.goBack(); 

      console.log("Update expenses category details for:", id, title, description);
    } catch(error) {
      console.error("Update expenses category error: ", error);
    }
    
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


            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  
                  backgroundColor: isEdited 
                    ? (theme === 'dark' ? '#515151' : '#E69DB8') 
                    : (theme === 'dark' ? '#7A7A7A' : '#d3d3d3'), 
                  borderColor: isEdited ?(theme === 'dark' ? '#E69DB8' : '#E69DB8'):(theme === 'dark' ? '#E69DB8' : '#d3d3d3'), 
                  borderWidth: 2,
                }
              ]}
              onPress={handleSave}
              disabled={!isEdited} 
            >
              <Text
                style={[
                  styles.saveButtonText,
                  {
                    color: isEdited ? (theme === 'dark' ? 'white' : 'black') : (theme === 'dark' ? 'white' : 'black') 
                  }
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditExpensesCategory;
