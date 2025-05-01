import { StyleSheet } from 'react-native';

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
    margin: 30,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#424242',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
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
    fontFamily: 'WinkySans-VariableFont_wght',
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
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  screenPadding: {
    paddingHorizontal: 12,
  },
  listItemTouchable: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  transactionBox: {
    flexDirection: 'row',
    backgroundColor: '#FFC1DA',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'space-between', // Align left and right elements
    alignItems: 'center', // Ensure the text is vertically centered
  },
  transactionInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'WinkySans-VariableFont_wght',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#424242',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 18,
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  userName: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  logoContainer: {
    alignItems: 'center',  
    marginVertical: 20,    
  },
  logo: {
    width: 100,           
    height: 100,          
    borderRadius: 50,     
  },
  periodSelector: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  periodText: {
    color: '#424242',
    fontWeight: '500',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  balanceContainer: {
    backgroundColor: '#FDE6F6',
    padding: 20,
    marginBottom: 25,
  },
  balanceLabel: {
    fontSize: 20,
    color: '#424242',
    marginBottom: 8,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  balanceAmount: {
    fontSize: 43,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'WinkySans-VariableFont_wght',
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
    fontSize: 20,
    color: '#424242',
    marginBottom: 8,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  incomeText: {
    color: '#2ecc71',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  expenseText: {
    color: '#e74c3c',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: '500',
    fontFamily: 'WinkySans-VariableFont_wght',
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

export const AddExpensesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  amountText: {
    fontSize: 20,
    color: 'black',
    marginRight: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'WinkySans-VariableFont_wght', 
  },
  datePickerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght', 
    fontSize: 16,
  },
  doneButton: {
    marginTop: 60,
    backgroundColor: '#E69DB8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght', 
  },
});

export const AddExpensesCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 10,
    marginBottom: 45,
    maxHeight: 200, 
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#E69DB8', 
  },
  itemText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    marginLeft: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#E69DB8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  confirmationMessage: {
    fontSize: 16,
    color: 'green',
    fontWeight: '500',
    marginTop: 10,
  },
}); 

export const AddIncomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght', 
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  amountText: {
    fontSize: 20,
    color: 'black',
    marginRight: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  textInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'WinkySans-VariableFont_wght', 
  },
  datePickerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    fontSize :16
  },
  doneButton: {
    marginTop: 60,
    backgroundColor: '#E69DB8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize :16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const AddIncomeCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 10,
    marginBottom: 45,
    maxHeight: 200, 
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#E69DB8', 
  },
  itemText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    marginLeft: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#E69DB8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  confirmationMessage: {
    fontSize: 16,
    color: 'green',
    fontWeight: '500',
    marginTop: 10,
  },
});

export const BackUpCloudStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerText: {
    fontSize: 30,
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
    fontWeight: 'bold',
  },
  lastBackupContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    marginBottom: 5,
  },
  lastBackupText: {
    fontSize: 16,
    color: 'gray',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#E69DB8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const EditExpensesCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  input: {
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  datePickerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const EditIncomeCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE6F6",
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: "black",
    marginBottom: 5,
    fontFamily: "WinkySans-VariableFont_wght",
  },
  input: {
    borderWidth: 2,
    borderColor: "#DBABA1",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: "WinkySans-VariableFont_wght",
  },
  datePickerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#DBABA1",
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    color: "black",
    fontFamily: "WinkySans-VariableFont_wght",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#393533",
    fontFamily: "WinkySans-VariableFont_wght",
  },
});

export const EditTransactionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
    padding: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  input: {
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  datePickerButton: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#DBABA1',
    borderRadius: 5,
    padding: 15,
  },
  dateText: {
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#393533',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const ExpensesCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionText: {
    fontSize: 16,
    color: '#f57cbb',
    marginHorizontal: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC1DA',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
  },
  icon: {
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const ForgetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 30,
    borderRadius: 70,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
    marginTop: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  button: {
    backgroundColor: '#E69DB8',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#393533',
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  tipsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  tips: {
    color: '#f57cbb',
    marginLeft: 4,
    fontWeight: '600',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const IncomeCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  actionText: {
    fontSize: 16,
    color: '#f57cbb',
    marginHorizontal: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC1DA',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
  },
  icon: {
    marginRight: 15, 
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    fontFamily: 'WinkySans-VariableFont_wght', 
  },
});

export const SettingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC1DA',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
  },
  icon: {
    marginRight: 20,
  },
  rowText: {
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  toggleText: {
    fontSize: 18,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 30,
    borderRadius: 70,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
    marginTop: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
    left: 240,
  },
  forgotText: {
    color: '#f57cbb',
    fontWeight: '600',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  button: {
    backgroundColor: '#E69DB8',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#393533',
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  tipsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerLink: {
    color: '#f57cbb',
    marginLeft: 4,
    fontWeight: '600',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  grayText: {
    color: '#555',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 30,
    borderRadius: 70,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
    marginTop: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  button: {
    backgroundColor: '#E69DB8',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#393533',
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  tipsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  tips: {
    color: '#f57cbb',
    marginLeft: 4,
    fontWeight: '600',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});

export const ViewExpensesCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 12,
  },
  scrollView: {
    flexGrow: 1, 
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});


export const ViewIncomeCategoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 12,
  },
  scrollView: {
    flexGrow: 1, 
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});


export const ViewTransactionStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  scrollView: {
    flexGrow: 1,
  },
  detailItem: {
    marginBottom: 20,
  },
  detailLabel: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#DBABA1',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'WinkySans-VariableFont_wght',
  },
});
