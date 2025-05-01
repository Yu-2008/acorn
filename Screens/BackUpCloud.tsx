import React from "react";
import {SafeAreaView, Text,View} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from "../Types";


type Props = StackScreenProps<SettingStackParamList, 'GoBackUpCloud'>;


const BackUpCloud = ({route, navigation}: Props) => {
    return(
        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:50, color: 'black'}}>BackUpCloud</Text>
        </SafeAreaView>
    )
}

export default BackUpCloud;