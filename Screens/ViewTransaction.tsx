import React from "react";
import {SafeAreaView, Text,View, TouchableOpacity} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';


type Props = StackScreenProps<MainStackParamList, 'ViewTransaction'>;

const ViewTransaction = ({route,navigation}: Props) => {
    const {transID} = route.params;

    const actions = [
        {
          text: "Edit",
          //icon: require("../assets/edit.png"), // Replace with your own icon path
          name: "edit",
          position: 1,
          color: '#007AFF',
        },
        {
          text: "Delete",
          //icon: require("../assets/delete.png"), // Replace with your own icon path
          name: "delete",
          position: 2,
          color: '#FF3B30',
        },
      ];
    
      const handleActionPress = (name?: string) => {
        if (name === "edit") {
         navigation.navigate('EditTransaction', {transID: transID});
        } else if (name === "delete") {
          //call delete sql
          console.log(`Delete transaction with ID ${transID}`);
        }
    };


    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize:50, color: 'black'}}>View Transaction</Text>
            <Text style={{fontSize:50, color: 'black'}}>ID: {transID}</Text>
            
            <FloatingAction
                    actions={actions}
                    onPressItem={handleActionPress}
                    color="#007AFF"
            />

        </SafeAreaView>
    )
}

export default ViewTransaction;