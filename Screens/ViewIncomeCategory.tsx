import React, { useState } from "react";
import { ViewIncomeCategoryStyles as styles } from '../src/styles/Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Alert } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from '../src/types/Types';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import { useTheme } from '../src/contexts/ThemeContext';
import { getIncomeCategoryById, deleteIncomeCategory } from "../src/database/database";
import { useFocusEffect } from "@react-navigation/native";

type Props = StackScreenProps<IncomeCategoryParamList, 'ViewIncomeCategory'>;

const ViewIncomeCategory = ({ route, navigation }: Props) => {
  const { incomeID } = route.params;
  const [title, setTitle] = useState(route.params.incomeTitle);
  const [description, setDescription] = useState(route.params.incomeDescription);
  const { theme } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      (async () => {
        const fresh = await getIncomeCategoryById(incomeID);
        if (fresh && active) {
          setTitle(fresh.title);
          setDescription(fresh.description);
        }
      })();
      return () => { active = false; };
    }, [incomeID])
  );
  // Actions for FloatingAction button
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
  // Handle action press
  const handleActionPress = (name?: string) => {
    if (name === "edit") {
      navigation.navigate('EditIncomeCategory', { 
        incomeID, 
        incomeTitle: title, 
        incomeDescription: description ? description : "No description"
       });
    } else if (name === "delete") {
      console.log(`Delete category ${title}`);
      Alert.alert(
        "Delete income category?",
        `Are you sure you want to delete "${title}"?`,
        [
          {text: "Cancel", style: "cancel"},
          {
            text: "Delete",
            style: "destructive",
            onPress: async()=>{
              try{
                await deleteIncomeCategory(incomeID);
                console.log(`Income category "${title}" deleted.`)
                navigation.goBack();
              }catch(error){
                console.log("Delete income category error: ", error);
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
          <Text style={[styles.detailLabel, { color: theme === 'dark' ? 'white' : 'black' }]}>Category Title</Text>
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

export default ViewIncomeCategory;
