import React from "react";
import {SafeAreaView, Text,View} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from "../Types";


type Props = StackScreenProps<MainStackParamList, 'EditTransaction'>;




const EditTransaction = ({route, navigation}: Props) => {
  const {transID} = route.params;
  
    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, color: 'black'}}>Edit Transaction</Text>
          <Text style={{fontSize:50, color: 'black'}}>ID: {transID}</Text>
        </SafeAreaView>
    )
}

export default EditTransaction;