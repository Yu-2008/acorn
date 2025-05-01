import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TouchableHighlight, Animated } from 'react-native';
import { HomeStyles as styles } from '../Styles';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../Types';
import { DarkModeProvider } from '../DarkModeContext';

type Props = StackScreenProps<MainStackParamList, 'Home'>;

const data = [
  { 
    transID: 1, 
    title: 'Lunch', 
    date: new Date('2025-01-31').toISOString(), 
    amount: 50.0, 
    transactionType: 'Expenses' 
  },
  { 
    transID: 2, 
    title: 'Salary', 
    date: new Date('2025-01-30').toISOString(), 
    amount: 150.0, 
    transactionType: 'Income' 
  },
];


const Home = ({ route, navigation }: Props) => {
  const [userName, setUserName] = useState('John Doe');
  const [totalBalance, setTotalBalance] = useState(100.0);
  const [income, setIncome] = useState(150.0);
  const [expenses, setExpenses] = useState(50.0);
  const [periodText, setPeriodText] = useState('Weekly');

  const colorAnim = new Animated.Value(0); 

  useEffect(() => {
    const startColorAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnim, {
            toValue: 1, 
            duration: 2000, 
            useNativeDriver: false, 
          }),
          Animated.timing(colorAnim, {
            toValue: 0, 
            duration: 2000, 
            useNativeDriver: false, 
          }),
        ])
      ).start();
    };

    startColorAnimation();
  }, []);

  const colorInterpolation = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF9068', '#FFB6B6'], 
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[styles.container, styles.screenPadding]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { fontFamily: 'WinkySans-VariableFont_wght' }]}>Hello,</Text>
          <Animated.Text
            style={[styles.userName, { fontFamily: 'WinkySans-VariableFont_wght', color: colorInterpolation }]} // Animated color
          >
            {userName}
          </Animated.Text>
        </View>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={[styles.periodText, { fontFamily: 'WinkySans-VariableFont_wght' }]}>{periodText}</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, { fontFamily: 'WinkySans-VariableFont_wght' }]}>Total Balance</Text>
        <Text style={[styles.balanceAmount, { fontFamily: 'WinkySans-VariableFont_wght' }]}>RM {totalBalance.toFixed(2)}</Text>
      </View>

      {/* Income/Expense Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryLabel, { fontFamily: 'WinkySans-VariableFont_wght' }]}>Income</Text>
          <Text
            style={[styles.summaryAmount, styles.incomeText, { fontFamily: 'WinkySans-VariableFont_wght' }]}
          >
            + RM{income.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryLabel, { fontFamily: 'WinkySans-VariableFont_wght' }]}>Expenses</Text>
          <Text
            style={[styles.summaryAmount, styles.expenseText, { fontFamily: 'WinkySans-VariableFont_wght' }]}
          >
            - RM{expenses.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Transaction Header */}
      <View style={styles.transactionHeader}>
        <Text style={[styles.sectionTitle, { fontFamily: 'WinkySans-VariableFont_wght' }]}>
          Transaction History
        </Text>
      </View>

      {/* Transaction List */}
      <FlatList
      style={{ flex: 1 }}
      data={data}
      renderItem={({ item }) => (
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('ViewTransaction', {
              transTitle: item.title,
              transDate: item.date,
              transType: item.transactionType,
              transAmount: item.amount,
            });
          }}
          underlayColor="#FFCCCC"
          style={styles.listItemTouchable}
        >
          <View style={styles.transactionBox}>
            <View style={styles.transactionInfo}>
              <Text style={[styles.transactionTitle, { fontFamily: 'WinkySans-VariableFont_wght' }]}>
                {item.title} 
              </Text>
              <Text style={[styles.transactionDate, { fontFamily: 'WinkySans-VariableFont_wght' }]}>
                {formatDate(item.date)} 
              </Text>
            </View>
            <Text
              style={{
                color: item.transactionType === 'Income' ? 'green' : 'red',
                fontSize: 16,
                fontWeight: '500',
                fontFamily: 'WinkySans-VariableFont_wght',
                alignSelf: 'flex-end',
              }}
            >
              {item.transactionType === 'Income' ? '+' : '-'} RM {item.amount.toFixed(2)}
            </Text>
          </View>
        </TouchableHighlight>
      )}
    />
    </SafeAreaView>

  );
};

export default Home;
