import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableHighlight, Animated, ScrollView } from 'react-native';
import { HomeStyles as styles } from '../src/styles/Styles';
import type { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../src/types/Types';
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from '../src/contexts/UserContext';
import { getUsernameById, getTransactionHistoryById } from "../src/database/database";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

type Props = StackScreenProps<MainStackParamList, 'Home'>;

type Transaction = {
  transID: number;
  transType: 0 | 1;
  transCategory: string;
  transTitle: string;
  transactionDate: number;
  amount: number;
  description: string | null;
  location: string | null;
};

const Home = ({ navigation }: Props) => {
  const { userID } = useUser();
  const [username, setUsername] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const { theme } = useTheme();

  const colorAnim = new Animated.Value(0);
  const periodOptions = ['Today', 'Weekly', 'Monthly', 'Yearly', 'All'] as const;
  type Period = typeof periodOptions[number];
  const [period, setPeriod] = useState<Period>('Weekly');

  
  useFocusEffect(
    React.useCallback(() => {
      const loadUsername = async () => {
        if (userID) {
          const user = await getUsernameById(userID);
          setUsername(user ?? ' ');
        } else {
          console.log("Cannot get user ID.");
        }
      };
      loadUsername();
    }, [userID])
  );

  const loadTransHistory = async (selectedPeriod: Period) => {
    if (userID) {
      const now = Date.now();
      let cutoff = 0;
      switch (selectedPeriod) {
        case 'Today':
          const d = new Date(); d.setHours(0, 0, 0, 0);
          cutoff = d.getTime();
          break;
        case 'Weekly':
          cutoff = now - 7 * 24 * 60 * 60 * 1000;
          break;
        case 'Monthly':
          const m = new Date(); m.setDate(1); m.setHours(0, 0, 0, 0);
          cutoff = m.getTime();
          break;
        case 'Yearly':
          const y = new Date(); y.setMonth(0, 0); y.setHours(0, 0, 0, 0);
          cutoff = y.getTime();
          break;
        case 'All':
          cutoff = 0;
          break;
      }

      const trans = await getTransactionHistoryById(userID, cutoff);
      setTransactions(trans);

      let inc = 0;
      let exp = 0;
      trans.forEach(tr => {
        { tr.transType === 0 ? inc += tr.amount : exp += tr.amount };
      });
      setIncome(inc);
      setExpenses(exp);
      setTotalBalance(inc - exp);
    } else {
      console.log("Cannot get user ID.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTransHistory(period);
    }, [userID, period])
  );

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
  }, [colorAnim]);

  const colorInterpolation = colorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#E248BA', '#A767D6', '#6C86F1'],
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
    <SafeAreaView style={[styles.container, styles.screenPadding, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.transID.toString()}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={[styles.greeting, { fontFamily: 'WinkySans-VariableFont_wght' },{ color: theme === 'dark' ? 'white' : '#424242' }]}>Hello,</Text>
                <Animated.Text
                  style={[styles.userName, { fontFamily: 'WinkySans-VariableFont_wght', color: colorInterpolation }]}
                >
                  {username}
                </Animated.Text>
              </View>

              <View style={styles.periodPickerContainer}>
                <Picker
                  selectedValue={period}
                  onValueChange={(value) => {
                    setPeriod(value);
                    loadTransHistory(value);
                  }}
                  mode="dropdown"
                  style={{ width: 150, color: theme === 'dark' ? 'white' : 'black' }}
                >
                  {periodOptions.map(p => (
                    <Picker.Item key={p} label={p} value={p} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Balance Section */}
            <View style={[styles.balanceContainer, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
              <Text style={[styles.balanceLabel, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>Total Balance</Text>
              <Text style={[styles.balanceAmount, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>RM {totalBalance.toFixed(2)}</Text>
            </View>

            {/* Income/Expense Summary */}
            <View style={styles.summaryContainer}>
              <View style={[styles.summaryCard, { backgroundColor: theme === 'dark' ? '#5D5D5D' : '#f8f9fa' }]}>
                <Text style={[styles.summaryLabel, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>Income</Text>
                <Text
                  style={[styles.summaryAmount, styles.incomeText, { fontFamily: 'WinkySans-VariableFont_wght' }]}
                >
                  + RM{income.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: theme === 'dark' ? '#5D5D5D' : '#f8f9fa' }]}>
                <Text style={[styles.summaryLabel, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>Expenses</Text>
                <Text
                  style={[styles.summaryAmount, styles.expenseText, { fontFamily: 'WinkySans-VariableFont_wght' }]}
                >
                  - RM{expenses.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Transaction Header */}
            <View style={styles.transactionHeader}>
              <Text style={[styles.sectionTitle, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>
                Transaction History
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme === 'dark' ? 'white' : '#424242' }]}>
              -----No transactions yet-----
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('ViewTransaction', {
                transID: item.transID,
                transTitle: item.transTitle,
                transDate: item.transactionDate,
                transType: item.transType,
                transCategory: item.transCategory,
                transAmount: item.amount,
                transDescription: item.description || "",
                transLocation: item.location,
              });
            }}
            underlayColor="#FFCCCC"
            style={styles.listItemTouchable}
          >
            <View style={[styles.transactionBox, { backgroundColor: theme === 'dark' ? '#5D5D5D' : '#FFC1DA' }]}>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionTitle, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? 'white' : '#424242' }]}>
                  {item.transTitle}
                </Text>
                <Text style={[styles.transactionDate, { fontFamily: 'WinkySans-VariableFont_wght' }, { color: theme === 'dark' ? '#DEDEDE' : '#424242' }]}>
                  {formatDate(new Date(item.transactionDate).toISOString())}
                </Text>
              </View>
              <Text
                style={{
                  color: item.transType === 0 ? '#2ecc71' : '#e74c3c',
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: 'WinkySans-VariableFont_wght',
                  alignSelf: 'flex-end',
                }}
              >
                {item.transType === 0 ? '+' : '-'} RM {item.amount.toFixed(2)}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );


};

export default Home;
