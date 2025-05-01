import React from "react";
import {SafeAreaView, Text,View} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";


type Props = StackScreenProps<ExpensesCategoryParamList, 'EditExpensesCategory'>;


const EditExpensesCategory = ({route, navigation}: Props) => {
  const {expensesID} = route.params;

  return(
      <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:50, color: 'black'}}>Edit Expenses Category</Text>
        <Text style={{fontSize:50, color: 'black'}}>ID: {expensesID}</Text>
      </SafeAreaView>
  )
}

export default EditExpensesCategory;