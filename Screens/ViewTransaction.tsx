import React, { useEffect, useState } from 'react';
import { ViewTransactionStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';
import { useTheme } from '../ThemeContext';
import { useUser } from '../UserContext';
import { getTransactionByTransId } from '../SQLite';

type Props = StackScreenProps<MainStackParamList, 'ViewTransaction'>;

const ViewTransaction = ({ route, navigation }: Props) => {
  const { userID } = useUser();
  const { transID } = route.params;
  const { theme } = useTheme();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);


  const handleActionPress = (name?: string) => {
    if (!transaction) return;

    if (name === "edit") {
      navigation.navigate('EditTransaction', { ...transaction });
    } else if (name === "delete") {
      console.log(`Delete transaction: ${transaction.transTitle}`);
    }
  };

  {/** 
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6', justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F17EA8" />
      </SafeAreaView>
    );
  }*/}

  if (!transaction) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Transaction not found.</Text>
      </SafeAreaView>
    );
  };

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

  

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        console.log("Fetching transaction with ID", transID);
        const result = await getTransactionByTransId(transID);
        console.log("Result from DB:", result); 
        setTransaction(result);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } 
    };

    fetchTransaction();
  }, [userID, transID]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {[
          { label: 'Transaction Type', value: transaction.transType },
          { label: 'Transaction Name', value: transaction.transTitle },
          { label: 'Date', value: new Date(transaction.transDate).toDateString() },
          { label: 'Amount', value: `RM ${Number(transaction.transAmount).toFixed(2)}` },
          { label: 'Transaction Description (Optional)', value: transaction.transDescription }
        ].map((item, index) => (
          <View style={styles.detailItem} key={index}>
            <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.label}</Text>
            <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
              <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.value}</Text>
            </View>
          </View>
        ))}
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
