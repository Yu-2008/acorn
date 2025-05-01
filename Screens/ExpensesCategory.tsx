import React, { useState, useContext } from "react";
import { ExpensesCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<ExpensesCategoryParamList, 'ExpensesCategory'>;

const data = [
  { 
    expensesID: 1, 
    expensesTitle: 'Breakfast', 
    expensesDescription: 'A light morning meal', 
    expensesDate: new Date(),
    expensesAmount: 15.00,
  },
  { 
    expensesID: 2, 
    expensesTitle: 'Lunch', 
    expensesDescription: 'A delicious lunch break', 
    expensesDate: new Date(),
    expensesAmount: 25.00, 
  },
  { 
    expensesID: 3, 
    expensesTitle: 'Dinner', 
    expensesDescription: 'A hearty dinner', 
    expensesDate: new Date(),
    expensesAmount: 40.00,  
  },
  { 
    expensesID: 4, 
    expensesTitle: 'Groceries', 
    expensesDescription: 'Food and household items', 
    expensesDate: new Date(),
    expensesAmount: 150.00,  
  },
  { 
    expensesID: 5, 
    expensesTitle: 'Transportation', 
    expensesDescription: 'Public transport expenses', 
    expensesDate: new Date(),
    expensesAmount: 50.00,  
  },
];

const ExpensesCategory = ({ route, navigation }: Props) => {
  const { theme } = useTheme();

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Breakfast':
        return <MaterialIcons name="coffee" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
      case 'Lunch':
        return <Ionicons name="fast-food" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
      case 'Dinner':
        return <Ionicons name="wine" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
      case 'Groceries':
        return <Ionicons name="cart" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
      case 'Transportation':
        return <Ionicons name="car-sport" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
      default:
        return <Ionicons name="file-tray" size={24} color={theme === 'dark' ? 'white' : '#393533'} style={styles.icon} />;
    }
  };

  const handleAddMore = () => {
    navigation.navigate('AddExpensesCategory');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      {/* Add Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddMore}>
          <Text style={[styles.actionText, { color: theme === 'dark' ? '#fff' : '#f57cbb' }]}>Add More</Text>
        </TouchableOpacity>
      </View>

      {/* Expenses List */}
      <FlatList
        data={data}
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={(item) => item.expensesID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewExpensesCategory', {
              expensesTitle: item.expensesTitle,
              expensesDescription: item.expensesDescription,
              expensesDate: item.expensesDate.toISOString(),
              expensesAmount: Number(item.expensesAmount),
            })}
          >
            <View style={[styles.itemRow, { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }]}>
              {getIconForCategory(item.expensesTitle)}
              <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>{item.expensesTitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ExpensesCategory;
