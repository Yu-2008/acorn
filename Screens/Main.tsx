import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { HomeStyles as styles } from '../Styles';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';


type Props = StackScreenProps<MainStackParamList, 'Main'>;



const data=[
  { transID: 1, title: 'Lunch', date: 'Jan 30, 2020', amount: 50.00, transactionType: 'Expenses' },
  { transID: 2, title: 'Salary', date: 'Jan 30, 2020', amount: 150.00, transactionType: 'Income' }
]



const Home = ({route,navigation}: Props) => {
  // Dynamic data states
  const [userName, setUserName] = useState('John Doe');
  const [totalBalance, setTotalBalance] = useState(100.00);
  const [income, setIncome] = useState(150.00);
  const [expenses, setExpenses] = useState(50.00);
  const [periodText, setPeriodText] = useState('Weekly')
  

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>{periodText}</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>RM {totalBalance.toFixed(2)}</Text>
      </View>

      {/* Income/Expense Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={[styles.summaryAmount, styles.incomeText]}>+ RM{income.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Expenses</Text>
          <Text style={[styles.summaryAmount, styles.expenseText]}>- RM{expenses.toFixed(2)}</Text>
        </View>
      </View>

      {/* Transaction History */}
      <View style={styles.transactionHeader}>
        <Text style={styles.sectionTitle}>Transaction History</Text>
      </View>

      {/*transaction list */}
      <FlatList style={{flex:1}}
            data = {data}
            showsVerticalScrollIndicator={ true }
            renderItem={ ({item}) => (
              <TouchableHighlight
                  /* View the transaction's details*/
                  onPress={()=>{
                    navigation.navigate('ViewTransaction', { transID: item.transID});
                  }}
              >
                  {/* Apprearance of the flatlist*/}          
                  <View style={{backgroundColor: 'white', margin: 10}}>
                    <Text style={{fontSize:35, color:'black', margin: 10, fontWeight: 'bold'}}>{item.title}</Text>
                    <Text style={{color: (`${item.transactionType}`==='Income'? 'green': 'red')}}>RM{item.amount}</Text>
                  </View>
              </TouchableHighlight>
            )}
        />

      

       
        
      
    </SafeAreaView>
  );
};

export default Home;