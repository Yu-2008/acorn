import React from "react";
import {SafeAreaView, Text,View} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { ExpensesCategoryParamList } from "../Types";


type Props = StackScreenProps<ExpensesCategoryParamList, 'AddExpensesCategory'>;


const AddExpensesCategory = ({route, navigation}: Props) => {
    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, color: 'black'}}>Add Expenses Category</Text>
        </SafeAreaView>
    )
}

export default AddExpensesCategory;