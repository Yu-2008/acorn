import React from "react";
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { ExpensesCategoryParamList } from "../Types";

type Props = StackScreenProps<ExpensesCategoryParamList, 'ExpensesCategory'>;

const data = [
  { expensesID: 1, expensesTitle: 'Lunch', expensesDescription: '', userID: 1 },
  { expensesID: 2, expensesTitle: 'Dinner', expensesDescription: '', userID: 1 },
];

const ExpensesCategory = ({ route, navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rightActions}>
          <TouchableOpacity onPress={() => navigation.navigate('AddExpensesCategory')}>
            <Text style={styles.actionText}>Add More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Expenses List */}
      <FlatList
        data={data}
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={(item) => item.expensesID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewExpensesCategory', { expensesID: item.expensesID })}
          >
            <View style={styles.itemRow}>
              <View style={styles.iconPlaceholder} />
              <Text style={styles.itemText}>{item.expensesTitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f4f5f3',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: 'gray',
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 14,
    color: 'gray',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginRight: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ExpensesCategory;
