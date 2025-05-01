import React, { useState, useContext } from "react";
import { IncomeCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from "../Types";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<IncomeCategoryParamList, 'IncomeCategory'>;

const IncomeCategory = ({ route, navigation }: Props) => {
  const { theme } = useTheme();

  const [data, setData] = useState([
    { 
      id: 1, 
      title: 'Salary', 
      description: 'Monthly salary from full-time job', 
      date: new Date(), 
      amount: 5000 
    },
    { 
      id: 2, 
      title: 'Side Income', 
      description: 'Freelance work and online sales', 
      date: new Date(), 
      amount: 1500 
    },
    { 
      id: 3, 
      title: 'Investments', 
      description: 'Profit from stocks and bonds', 
      date: new Date(), 
      amount: 2000 
    },
    { 
      id: 4, 
      title: 'Business Income', 
      description: 'Earnings from personal business', 
      date: new Date(), 
      amount: 2500 
    },
  ]);

  const getIconForCategory = (category: string) => {
    const iconColor = theme === 'dark' ? 'white' : '#393533'; // Icon color based on theme
    switch (category) {
      case 'Salary':
        return <Ionicons name="cash" size={24} color={iconColor} style={styles.icon} />;
      case 'Side Income':
        return <FontAwesome name="usd" size={24} color={iconColor} style={styles.icon} />;
      default:
        return <Ionicons name="file-tray" size={24} color={iconColor} style={styles.icon} />;
    }
  };

  {/**handle onPress */}
  const handleAddMore =()=>{
    console.log("Add More pressed");
    navigation.navigate('AddIncomeCategory')
  }

  const renderItem = ({ item }: { item: { id: number, title: string, description: string, date: Date, amount: number } }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewIncomeCategory', { 
        incomeTitle: item.title, 
        incomeDescription: item.description, 
        incomeDate: item.date.toISOString(), 
        incomeAmount: item.amount 
      })}
      style={[
        styles.itemRow,
        { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }  // Dynamic background color
      ]}
    >
      {getIconForCategory(item.title)}
      <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      {/* Add Buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AddIncomeCategory')}>
          <Text style={[styles.actionText, { color: theme === 'dark' ? 'white' : '#393533' }]}>
            Add More
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
};

export default IncomeCategory;
