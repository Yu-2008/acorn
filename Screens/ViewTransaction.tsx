import React from 'react';
import { ViewTransactionStyles as styles } from '../Styles';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';

type Props = StackScreenProps<MainStackParamList, 'ViewTransaction'>;

const ViewTransaction = ({ route, navigation }: Props) => {
  const { transTitle, transDate, transType, transAmount } = route.params;

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
      navigation.navigate('EditTransaction', { transTitle, transDate, transType, transAmount });
    } else if (name === "delete") {
      console.log(`Delete transaction: ${transTitle}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Transaction Title</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{transTitle}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{new Date(transDate).toDateString()}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Transaction Type</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>{transType}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount</Text>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>RM {transAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <FloatingAction
        actions={actions}
        onPressItem={handleActionPress}
        color="#F17EA8"
      />
    </SafeAreaView>
  );
};

export default ViewTransaction;
