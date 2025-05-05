import React, { useState } from "react";
import { ViewExpensesCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View,ScrollView, Alert } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from '../Types';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useTheme } from '../ThemeContext';
import { getExpensesCategoryById, deleteExpensesCategory} from "../SQLite";
import { useFocusEffect } from "@react-navigation/native";

type Props = StackScreenProps<ExpensesCategoryParamList, 'ViewExpensesCategory'>;

const ViewExpensesCategory = ({ route, navigation }: Props) => {
  const { expensesID } = route.params;
  const [title, setTitle] = useState(route.params.expensesTitle);
  const [description, setDescription] = useState(route.params.expensesDescription);
  const { theme } = useTheme();

  useFocusEffect(
      React.useCallback(() => {
        let active = true;
        (async () => {
          const fresh = await getExpensesCategoryById(expensesID);
          if (fresh && active) {
            setTitle(fresh.title);
            setDescription(fresh.description);
          }
        })();
        return () => { active = false; };
      }, [expensesID])
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
    if (name === "edit") {
      navigation.navigate('EditExpensesCategory', { 
        expensesID,
        expensesTitle: title,
        expensesDescription: description 
      });
    } else if (name === "delete") {
      console.log(`Delete category ${title}`);
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
                await deleteExpensesCategory(expensesID);
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
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Name</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{title}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Description</Text>
          <View style={[styles.detailBox, { backgroundColor: theme === 'dark' ? '#444' : '#fff' }]}>
            <Text style={[styles.detailText, { color: theme === 'dark' ? 'white' : 'black' }]}>{description}</Text>
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
