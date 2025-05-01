import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from '../Types';
import { FloatingAction } from "react-native-floating-action";

type Props = StackScreenProps<IncomeCategoryParamList, 'ViewIncomeCategory'>;

const ViewIncomeCategory = ({ route, navigation }: Props) => {
  const { incomeID } = route.params;

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
      navigation.navigate('EditIncomeCategory', { incomeID });
    } else if (name === "delete") {
      //call delete sql
      console.log(`Delete category ${incomeID}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F6F5', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}>
        <Text style={{ fontSize: 20, color: 'black', marginBottom: 20 }}>Income Category Details</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Income Category ID</Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginTop: 5,
          }}>
            <Text style={{ fontSize: 18, color: 'black' }}>{incomeID}</Text>
          </View>
        </View>
      </View>
      <FloatingAction
              actions={actions}
              onPressItem={handleActionPress}
              color="#007AFF"
              />
    </SafeAreaView>
  );
};

export default ViewIncomeCategory;
