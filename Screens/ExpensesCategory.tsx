import React, { useState } from "react";
import { ExpensesCategoryStyles as styles } from '../src/styles/Styles';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../src/types/Types";
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { getExpensesCategories } from "../src/database/database";
import { GetIcon } from "../src/customComponent/CustomComponent";


type Props = StackScreenProps<ExpensesCategoryParamList, 'ExpensesCategory'>;

type ExpensesCategory = {
  id: number;
  title: string;
  description: string;
  icon: string; 
  iconLibrary: string; 
}

const ExpensesCategory = ({ navigation }: Props) => {
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
          Alert.alert("Get user ID failed", "Please sign in again.");
        }
      };
      
      loadExpensesCategories();
    }, [userID])
  );

  // Handler for navigating to AddExpensesCategory screen
  const handleAddMore = () => {
    console.log("Add more pressed")
    navigation.navigate('AddExpensesCategory');
  };
   // Handler for navigating to ViewExpensesCategory screen
  const handleView = (item: any) => {
    navigation.navigate('ViewExpensesCategory', {
      expensesID: item.id,
      expensesTitle: item.expensesTitle,
      expensesDescription: item.expensesDescription,
    });
  }

  const renderIcon = (iconName: string, iconLibrary: string) => {
    const color = theme === 'dark' ? 'white' : '#393533';
    const size = 24;

    return (
      <View style={styles.icon}>
      <GetIcon
        library={iconLibrary as 'Ionicons' | 'FontAwesome' | 'FontAwesome5'}
        name={iconName}
        color={color}
        size={size}
      />
      </View>
    );
  };

  const renderItem = ({ item }: { item: ExpensesCategory }) => (
    <TouchableOpacity
      onPress={() => handleView(item)}
      style={[
        styles.itemRow,
        { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }  // Dynamic background color
      ]}
    >
      {renderIcon(item.icon, item.iconLibrary)}
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
