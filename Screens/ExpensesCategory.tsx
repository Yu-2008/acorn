import React, { useState } from "react";
import { ExpensesCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useTheme } from '../ThemeContext';
import { useUser } from "../UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { getExpensesCategories } from "../SQLite";


type Props = StackScreenProps<ExpensesCategoryParamList, 'ExpensesCategory'>;

type ExpensesCategory = {
  id: number;
  title: string;
  description: string;
  icon: string; 
  iconLibrary: string; 
}

const ExpensesCategory = ({ route, navigation }: Props) => {
  const { userID } = useUser();
  const { theme } = useTheme();
  const [data, setData] = useState<ExpensesCategory[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadExpensesCategories = async () => {
        if (userID) {
          const categories = await getExpensesCategories(userID);
          categories.sort((a, b) => a.title.localeCompare(b.title));
          setData(categories); 
        } else {
          console.error("Cannot get user ID.");
        }
      };
      
      loadExpensesCategories();
    }, [userID])
  );

  {/**handle onPress */}
  const handleAddMore = () => {
    console.log("Add more pressed")
    navigation.navigate('AddExpensesCategory');
  };
  const handleView = (item: any) => {
    navigation.navigate('ViewExpensesCategory', {
      expensesID: item.id,
      expensesTitle: item.expensesTitle,
      expensesDescription: item.expensesDescription,
    });
  }

  const getIconForCategory = (iconName: string, iconLibrary: string) => {
    const iconColor = theme === 'dark' ? 'white' : '#393533'; // Icon color based on theme
    
    if (iconLibrary === 'Ionicons') {
      return <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />;
    } else if (iconLibrary === 'FontAwesome') {
      return <FontAwesome name={iconName} size={24} color={iconColor} style={styles.icon} />;
    } else {
      return <Ionicons name="file-tray" size={24} color={iconColor} style={styles.icon} />;
    }
  };

  const renderItem = ({ item }: { item: ExpensesCategory }) => (
    <TouchableOpacity
      onPress={() => handleView(item)}
      style={[
        styles.itemRow,
        { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }  // Dynamic background color
      ]}
    >
      {getIconForCategory(item.icon, item.iconLibrary)}
      <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  

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
        keyExtractor={(item) => item.id.toString()}
        renderItem={(renderItem)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
};

export default ExpensesCategory;
