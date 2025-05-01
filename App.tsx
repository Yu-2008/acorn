import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AddExpensesScreen from './Screens/AddExpenses';
import AddExpensesCategoryScreen from './Screens/AddExpensesCategory';
import AddIncomeScreen from './Screens/AddIncome';
import AddIncomeCategoryScreen from './Screens/AddIncomeCategory';
import BackUpCloudScreen from './Screens/BackUpCloud';
import EditExpensesCategoryScreen from './Screens/EditExpensesCategory';
import EditIncomeCategoryScreen from './Screens/EditIncomeCategory';
import EditTransactionScreen from './Screens/EditTransaction';
import ExpensesCategory from './Screens/ExpensesCategory';
import IncomeCategoryScreen from './Screens/IncomeCategory';
import MainScreen from './Screens/Main';
import SettingScreen from './Screens/Setting';
import SignInScreen from './Screens/SignIn';
import SignUpScreen from './Screens/SignUp';
import ForgetPasswordScreen from './Screens/ForgetPassword';
import ViewExpensesCategoryScreen from './Screens/ViewExpensesCategory';
import ViewIncomeCategoryScreen from './Screens/ViewIncomeCategory';
import ViewTransactionScreen from './Screens/ViewTransaction';

import { RootStackParamList, TabParamList, SignInUpStackParamList, SettingStackParamList, IncomeCategoryParamList, ExpensesCategoryParamList, MainStackParamList } from './Types'



const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const SignInUpStack = createStackNavigator<SignInUpStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const SettingStack  = createStackNavigator<SettingStackParamList>();
const IncomeCategoryStack = createStackNavigator<IncomeCategoryParamList>();
const ExpensesCategoryStack = createStackNavigator<ExpensesCategoryParamList>();


const SignInUpStackNavigator = ({onSignIn}:{onSignIn:()=>void})=>{
    return(
        <SignInUpStack.Navigator initialRouteName='SignIn' screenOptions={{headerShown: false}}>
            <SignInUpStack.Screen name='SignIn'>
                {(props: any) => <SignInScreen {...props} onSignIn={onSignIn} />}
            </SignInUpStack.Screen>
            <SignInUpStack.Screen name='SignUp' component={SignUpScreen}/>
            <SignInUpStack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
        </SignInUpStack.Navigator>
    )
}

const TabNavigator = ({ onSignOut }: { onSignOut: () => void }) => {
  //as
  
    return (
      <Tab.Navigator
        initialRouteName="AtMain"
        screenOptions={({ route }) => ({
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            let IconComponent: any = Ionicons;
  
            if (route.name === 'AtMain') {
              iconName = focused ? 'home' : 'home-outline';
              IconComponent = Ionicons;
            } else if (route.name === 'AddIncome') {
              iconName = 'money-bill-transfer';
              IconComponent = FontAwesome6;
            } else if (route.name === 'AddExpenses') {
              iconName = 'shopping-basket-add';
              IconComponent = Fontisto;
            } else if (route.name === 'GoSetting') {
              iconName = focused ? 'settings' : 'settings-outline';
              IconComponent = Ionicons;
            }
  
            return <IconComponent name={iconName} size={size} color={color} solid={focused} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#FAEDCE',
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
    <Tab.Screen 
        name="AtMain">
      {(props: any) => <MainStackNavigator {...props} />}
    </Tab.Screen>

    <Tab.Screen
      name="AddIncome"
      component={AddIncomeScreen}
      options={{
        tabBarLabel: 'Income',
        headerShown: true,
        title: 'Add Income Transaction',
        headerStyle: {
          backgroundColor: '#FAEDCE',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />

    <Tab.Screen
      name="AddExpenses"
      component={AddExpensesScreen}
      options={{
        tabBarLabel: 'Expenses',
        headerShown: true,
        title: 'Add Expenses Transaction',
        headerStyle: {
          backgroundColor: '#FAEDCE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />

          <Tab.Screen
            name="GoSetting"
            options={{
              tabBarLabel: 'Settings',
              headerShown: false, 
            }}
          >
            {(props: any) => (
              <SettingStackNavigator {...props} onSignOut={onSignOut} />
            )}
          </Tab.Screen>

          </Tab.Navigator>
        );
      };

const MainStackNavigator = () => {
    return (
      <MainStack.Navigator initialRouteName='Main'>
        <MainStack.Screen name='Main' component={MainScreen} options={{headerShown: false}}/>
        <MainStack.Screen name='ViewTransaction' component={ViewTransactionScreen} />
        <MainStack.Screen name='EditTransaction' component={EditTransactionScreen} />
      </MainStack.Navigator>
    );
  };
  

const SettingStackNavigator = ({onSignOut}:{onSignOut:()=>void}) =>{
    return(
        <SettingStack.Navigator initialRouteName='Settings' screenOptions={{headerShown: false}}>
            <SettingStack.Screen name='Settings' options={{headerShown: true}}>
                {(props: any) => <SettingScreen {...props} onSignOut={onSignOut}/>}
            </SettingStack.Screen>
            <SettingStack.Screen name='GoIncomeCategory'>
                {(props: any) => <IncomeCategoryStackNavigator {...props} />}
            </SettingStack.Screen>
            <SettingStack.Screen name='GoExpensesCategory'>
                {(props: any) => <ExpensesCategoryStackNavigator {...props} />}
            </SettingStack.Screen>
            <SettingStack.Screen name='GoBackUpCloud' component={BackUpCloudScreen} options={{headerShown: true, headerTitle: 'Back Up to Cloud'}}/>
        </SettingStack.Navigator>
    )
}

const IncomeCategoryStackNavigator = () =>{
    return(
        <IncomeCategoryStack.Navigator initialRouteName='IncomeCategory' screenOptions={{headerShown: true}}>
            <IncomeCategoryStack.Screen name='IncomeCategory' component={IncomeCategoryScreen} options={{headerTitle: 'Income Category'}}/>
            <IncomeCategoryStack.Screen name='AddIncomeCategory' component={AddIncomeCategoryScreen} options={{headerTitle: 'Add New Income Category'}}/>
            <IncomeCategoryStack.Screen name='ViewIncomeCategory' component={ViewIncomeCategoryScreen} options={{headerTitle: 'Income Category Details'}}/>
            <IncomeCategoryStack.Screen name='EditIncomeCategory' component={EditIncomeCategoryScreen} options={{headerTitle: 'Edit Income Category Details'}}/>
        </IncomeCategoryStack.Navigator>
    )
}

const ExpensesCategoryStackNavigator = () =>{
    return(
        <ExpensesCategoryStack.Navigator initialRouteName='ExpensesCategory' screenOptions={{headerShown: true}}>
            <ExpensesCategoryStack.Screen name='ExpensesCategory' component={ExpensesCategory} options={{headerTitle: 'Expenses Category'}}/>
            <ExpensesCategoryStack.Screen name='AddExpensesCategory' component={AddExpensesCategoryScreen}  options={{headerTitle: 'Add New Expenses Category'}}/>
            <ExpensesCategoryStack.Screen name='ViewExpensesCategory' component={ViewExpensesCategoryScreen} options={{headerTitle: 'Expenses Category Details'}}/>
            <ExpensesCategoryStack.Screen name='EditExpensesCategory' component={EditExpensesCategoryScreen} options={{headerTitle: 'Edit Expenses Category Details'}}/>
        </ExpensesCategoryStack.Navigator>
    )
}



const App=()=>{
    const [isSignIn, setIsSignIn] = useState<Boolean>(false);

    const handleSignIn=()=>{
        setIsSignIn(true);
    }
    const handleSignOut=()=>{
        setIsSignIn(false);
    }

    return(
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{headerShown: false}}>
                {isSignIn==false ? 
                    (
                        <RootStack.Screen name='AuthorizedSignIn'>
                            {()=> <SignInUpStackNavigator onSignIn={handleSignIn}/>}
                        </RootStack.Screen> )
                    :(
                        <RootStack.Screen name="GoMain">
                            {()=> <TabNavigator onSignOut={handleSignOut}/>}
                        </RootStack.Screen>
                    )}
            </RootStack.Navigator>
        </NavigationContainer>

        
    )
}

export default App;

