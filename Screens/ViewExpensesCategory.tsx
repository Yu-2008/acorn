import React from "react";
import { ViewExpensesCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from '../Types';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

type Props = StackScreenProps<ExpensesCategoryParamList, 'ViewExpensesCategory'>;

const ViewExpensesCategory = ({ route, navigation }: Props) => {
  const { expensesTitle, expensesDescription, expensesDate, expensesAmount } = route.params; 
  const parsedDate = new Date(expensesDate);

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
    if (name === "edit") {
      navigation.navigate('EditExpensesCategory', { expensesTitle, expensesDescription, expensesDate, expensesAmount });
    } else if (name === "delete") {
      console.log(`Delete category ${expensesTitle}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Category Name</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{expensesTitle}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Description</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{expensesDescription}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{parsedDate.toDateString()}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>RM {expensesAmount}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button for Edit and Delete */}
      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        color='#F17EA8'
      />
    </SafeAreaView>
  );
};

export default ViewExpensesCategory;
