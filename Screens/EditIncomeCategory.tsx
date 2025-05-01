import React from "react";
import {SafeAreaView, Text,View} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from "../Types";


type Props = StackScreenProps<IncomeCategoryParamList, 'EditIncomeCategory'>;


const EditIncomeCategory = ({route, navigation}: Props) => {
  const {incomeID} = route.params;
    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, color: 'black'}}>Edit Income Category</Text>
          <Text style={{fontSize:50, color: 'black'}}>ID: {incomeID}</Text>
        </SafeAreaView>
    )
}

export default EditIncomeCategory;