import React from "react";
import { ViewIncomeCategoryStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from '../Types';
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 

type Props = StackScreenProps<IncomeCategoryParamList, 'ViewIncomeCategory'>;

const ViewIncomeCategory = ({ route, navigation }: Props) => {
  const { incomeTitle, incomeDescription, incomeDate, incomeAmount } = route.params;
  const parsedDate = new Date(incomeDate);

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
      navigation.navigate('EditIncomeCategory', {incomeTitle, incomeDescription, incomeDate, incomeAmount });
    } else if (name === "delete") {
      console.log(`Delete category ${incomeTitle}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Income Category</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{incomeTitle}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Description</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{incomeDescription}</Text>
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
            <Text style={styles.detailText}>RM {incomeAmount}</Text>
          </View>
        </View>
      </ScrollView>

      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        color='#F17EA8'
      />
    </SafeAreaView>
  );
};

export default ViewIncomeCategory;
