
import {StyleSheet} from 'react-native';

export const SignInUpstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeefeb',
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    formContainer: {
        backgroundColor: '#f8f9fa',  
        borderRadius: 12,
        padding: 20,
        marginHorizontal: 20,        
        borderWidth: 1,
        borderColor: '#e9ecef', 
      },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left',
      color: 'black',
      margin: 30
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    tipsText: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    tips: {
      color: '#007bff',
      fontWeight: 'bold',
    },
  });

  export const HomeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeefeb',
    },
    scrollContainer: {
      padding: 20,
      paddingBottom: 80,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 25,
    },
    greeting: {
      fontSize: 18,
      color: '#666',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    periodSelector: {
      backgroundColor: 'white',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    periodText: {
      color: '#666',
      fontWeight: '500',
    },
    balanceContainer: {
      backgroundColor: '#f8f9fa',
      padding: 20,
      borderRadius: 12,
      marginBottom: 25,
    },
    balanceLabel: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    balanceAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 25,
    },
    summaryCard: {
      backgroundColor: '#f8f9fa',
      padding: 20,
      borderRadius: 12,
      width: '48%',
    },
    summaryLabel: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    summaryAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    incomeText: {
      color: '#2ecc71',
    },
    expenseText: {
      color: '#e74c3c',
    },
    transactionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    deleteText: {
      color: '#e74c3c',
      fontWeight: '500',
    },
    transactionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 16,
      borderRadius: 8,
      marginBottom: 10,
    },
    transactionTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 4,
    },
    transactionDate: {
      fontSize: 14,
      color: '#666',
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
    },
    navIcon: {
      padding: 10,
    },
  });


  export const SettingStyles=StyleSheet.create({
    button:{
        backgroundColor: 'lightblue',
        padding: 10
    }
  })

  export const IncomeCategoryStyles=StyleSheet.create({
    button:{
        backgroundColor: 'lightblue',
        padding: 10
    }
  })

  export const ExpensesCategoryStyles=StyleSheet.create({
    button:{
        backgroundColor: 'lightblue',
        padding: 10
    }
  })