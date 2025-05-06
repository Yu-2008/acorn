import React, { useEffect, useState } from 'react';
import { ViewTransactionStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { deleteTransactionById, getTransactionByTransId } from '../SQLite';
import { useFocusEffect } from '@react-navigation/native';

type Props = StackScreenProps<MainStackParamList, 'ViewTransaction'>;


const ViewTransaction = ({ route, navigation }: Props) => {
  const { userID } = useUser();
  const { transID }= route.params;
  const [title, setTitle] = useState(route.params.transTitle);
  const [type, setType] = useState(route.params.transType);
  const [description, setDescription] = useState(route.params.transDescription);
  const [date, setDate] = useState<Date>(new Date(route.params.transDate));
  const [amount, setAmount] = useState(route.params.transAmount);
  const [category, setCategory] = useState(route.params.transCategory);
  const [location, setLocation] = useState(route.params.transLocation);
  const { theme } = useTheme();


  useFocusEffect(
    
    React.useCallback(() => {
      
      let active = true;
      (async () => {
        const fresh = await getTransactionByTransId(transID);
        if (fresh && active) {
          setTitle(fresh.transTitle);
          setType(fresh.transType);
          setCategory(fresh.transCategory);
          setDescription(fresh.description);
          setDate(new Date(fresh.transactionDate));
          setAmount(fresh.amount);
        }
      })();
      return () => { active = false; };
    }, [transID])
  );

  const actions = [
    {
      text: "Edit",
      name: "edit",
      position: 1,
      color: '#007AFF',
      icon: <Ionicons name="create" size={24} color="white" /> 
    },
    {
      text: "Delete",
      name: "delete",
      position: 2,
      color: '#FF3B30',
      icon: <MaterialIcons name="delete" size={24} color="white" /> 
    },
  ];

  const handleActionPress = (name?: string) => {

    if (!transID) {
      Alert.alert("Error", "Transaction not found.");
    };

    if (name === "edit") {
      navigation.navigate('EditTransaction', {
        transID,
        transTitle: title,
        transDate: date.getTime(),
        transType: type,
        transCategory: category,
        transAmount: amount,
        transDescription: description ||  "",
        transLocation: location || "",
      });
    } else if (name === "delete") {
      console.log(`Delete transaction ${title}`);
      Alert.alert(
              "Delete expenses category?",
              `Are you sure you want to delete "${title}"?`,
              [
                {text: "Cancel", style: "cancel"},
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async()=>{
                    try{
                      await deleteTransactionById(transID);
                      console.log(`Expenses category "${title}" deleted.`)
                      navigation.goBack();
                    }catch(error){
                      console.log("Delete expenses category error: ", error);
                    }
                  }
                }
              ]
            )
    }
  };

  

  return (
    
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Transaction Type</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            {type===0? 
              <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                Income
              </Text>
            :
              <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>
                Expenses
              </Text>}
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Category</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{category}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Title</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{title}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Amount</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>RM {amount}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Description</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{description? description : "No description"}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Date</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}><Text>{date.toDateString()}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Location</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{location? location : "No location"}</Text>
          </View>
        </View>
        
      </ScrollView>

      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        color="#F17EA8"
      />
    </SafeAreaView>
  );
};

export default ViewTransaction;
