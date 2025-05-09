import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
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
import MainScreen from './Screens/Home';
import SettingScreen from './Screens/Setting';
import SignInScreen from './Screens/SignIn';
import SignUpScreen from './Screens/SignUp';
import ForgetPasswordScreen from './Screens/ForgetPassword';
import ViewExpensesCategoryScreen from './Screens/ViewExpensesCategory';
import ViewIncomeCategoryScreen from './Screens/ViewIncomeCategory';
import ViewTransactionScreen from './Screens/ViewTransaction';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { useTheme } from './src/contexts/ThemeContext';
import { UserProvider } from './src/contexts/UserContext';
import { useUser } from './src/contexts/UserContext';
import {
  RootStackParamList,
  TabParamList,
  SignInUpStackParamList,
  SettingStackParamList,
  IncomeCategoryParamList,
  ExpensesCategoryParamList,
  MainStackParamList,
} from './src/types/Types';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './src/config/FirebaseConfig';
import { initDB } from './src/database/database';
import { PubNubProvider } from 'pubnub-react';
import { pubnub } from './src/config/pubnubConfig';



const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const SignInUpStack = createStackNavigator<SignInUpStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const SettingStack = createStackNavigator<SettingStackParamList>();
const IncomeCategoryStack = createStackNavigator<IncomeCategoryParamList>();
const ExpensesCategoryStack = createStackNavigator<ExpensesCategoryParamList>();

// Shared header style function
const defaultHeaderOptions = (theme: string) => ({
  headerStyle: { backgroundColor: theme === 'dark' ? '#515151' : '#FFDDDD' },
  headerTintColor: theme === 'dark' ? '#FFFFFF' : '#393533',
  headerTitleStyle: {
    fontWeight: '500' as '500',
    fontFamily: 'WinkySans-VariableFont_wght',
    color: theme === 'dark' ? 'white' : 'black',
  },
});
// login, signup and password reset
const SignInUpStackNavigator = () => {
  return (
    <SignInUpStack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <SignInUpStack.Screen name="SignIn">
        {(props: any) => <SignInScreen {...props} />}
      </SignInUpStack.Screen>
      <SignInUpStack.Screen name="SignUp" component={SignUpScreen} />
      <SignInUpStack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
    </SignInUpStack.Navigator>
  );
};
// MainTabNavigator which contains tabs for different sections of the app
const TabNavigator = () => {
  const { theme } = useTheme();
  return (
    <PubNubProvider client={pubnub}>
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
            } else if (route.name === 'AddIncome') {
              iconName = 'money-bill-transfer';
              IconComponent = FontAwesome6;
            } else if (route.name === 'AddExpenses') {
              iconName = 'shopping-basket-add';
              IconComponent = Fontisto;
            } else if (route.name === 'GoSetting') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <IconComponent name={iconName} size={size} color={color} solid={focused} />;
          },
          tabBarActiveTintColor: theme === 'dark' ? 'white' : '#C4371B',
          tabBarInactiveTintColor: theme === 'dark' ? '#282828' : '#D39285',
          tabBarStyle: {
            backgroundColor: theme === 'dark' ? '#515151' : '#FFDDDD',
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'WinkySans-VariableFont_wght',
          },
        })}
      >
        <Tab.Screen name="AtMain">{(props: any) => <MainStackNavigator {...props} />}</Tab.Screen>

        <Tab.Screen
          name="AddIncome"
          component={AddIncomeScreen}
          options={{
            tabBarLabel: 'Income',
            headerShown: true,
            title: 'Add Income Transaction',
            ...defaultHeaderOptions(theme),
          }}
        />

        <Tab.Screen
          name="AddExpenses"
          component={AddExpensesScreen}
          options={{
            tabBarLabel: 'Expenses',
            headerShown: true,
            title: 'Add Expenses Transaction',
            ...defaultHeaderOptions(theme),
          }}
        />

        <Tab.Screen
          name="GoSetting"
          options={{
            tabBarLabel: 'Settings',
            headerShown: false,
          }}
        >
          {(props: any) => <SettingStackNavigator {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </PubNubProvider>
  );
};
// handles the screens related to the main app flow
const MainStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#515151' : '#FFDDDD',
        },
        headerTintColor: '#393533',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'WinkySans-VariableFont_wght',
          color: theme === 'dark' ? 'white' : 'black',
        },
      }}
    >
      <MainStack.Screen name="Home" component={MainScreen} />
      <MainStack.Screen
        name="ViewTransaction"
        component={ViewTransactionScreen}
        options={defaultHeaderOptions(theme)}
      />
      <MainStack.Screen
        name="EditTransaction"
        component={EditTransactionScreen}
        options={defaultHeaderOptions(theme)}
      />
    </MainStack.Navigator>
  );
};
// Stack navigators for income category management
const IncomeCategoryStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <IncomeCategoryStack.Navigator
      initialRouteName="IncomeCategory"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#515151' : '#FFDDDD',
        },
        headerTintColor: '#393533',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'WinkySans-VariableFont_wght',
          color: theme === 'dark' ? 'white' : 'black',
        },
      }}
    >
      <IncomeCategoryStack.Screen name="IncomeCategory" component={IncomeCategoryScreen} options={{ headerTitle: 'Income Category' }} />
      <IncomeCategoryStack.Screen name="AddIncomeCategory" component={AddIncomeCategoryScreen} options={{ headerTitle: 'Add New Income Category' }} />
      <IncomeCategoryStack.Screen name="ViewIncomeCategory" component={ViewIncomeCategoryScreen} options={{ headerTitle: 'Income Category Details' }} />
      <IncomeCategoryStack.Screen name="EditIncomeCategory" component={EditIncomeCategoryScreen} options={{ headerTitle: 'Edit Income Category Details' }} />
    </IncomeCategoryStack.Navigator>
  );
};
// Stack navigators for expense category management
const ExpensesCategoryStackNavigator = () => {
  const { theme } = useTheme();
  return (
    <ExpensesCategoryStack.Navigator
      initialRouteName="ExpensesCategory"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#515151' : '#FFDDDD',
        },
        headerTintColor: '#393533',
        headerTitleStyle: {
          fontWeight: '500',
          fontFamily: 'WinkySans-VariableFont_wght',
          color: theme === 'dark' ? 'white' : 'black',
        },
      }}
    >
      <ExpensesCategoryStack.Screen name="ExpensesCategory" component={ExpensesCategory} options={{ headerTitle: 'Expenses Category' }} />
      <ExpensesCategoryStack.Screen name="AddExpensesCategory" component={AddExpensesCategoryScreen} options={{ headerTitle: 'Add New Expenses Category' }} />
      <ExpensesCategoryStack.Screen name="ViewExpensesCategory" component={ViewExpensesCategoryScreen} options={{ headerTitle: 'Expenses Category Details' }} />
      <ExpensesCategoryStack.Screen name="EditExpensesCategory" component={EditExpensesCategoryScreen} options={{ headerTitle: 'Edit Expenses Category Details' }} />
    </ExpensesCategoryStack.Navigator>
  );
};
// Stack navigation for settings page and related screens
const SettingStackNavigator = () => {
  const { theme } = useTheme();

  // Sign out handler function
  const handleOnSignOut = async () => {
    console.log("Sign Out pressed");
    try {
      await FIREBASE_AUTH.signOut();
      console.log("Sign out successfully");
      Alert.alert("Sign out successful", "You have already signed out.");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <SettingStack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      {/* Pass handleOnSignOut function to SettingScreen */}
      <SettingStack.Screen 
        name="Settings" 
        options={{ headerShown: true, ...defaultHeaderOptions(theme) }}
      >
        {(props: any) => <SettingScreen {...props} onSignOut={handleOnSignOut} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="GoIncomeCategory">
        {(props: any) => <IncomeCategoryStackNavigator {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen name="GoExpensesCategory">
        {(props: any) => <ExpensesCategoryStackNavigator {...props} />}
      </SettingStack.Screen>
      <SettingStack.Screen
        name="GoBackUpCloud"
        component={BackUpCloudScreen}
        options={{
          headerShown: true,
          headerTitle: 'Back Up to Cloud',
          ...defaultHeaderOptions(theme),
        }}
      />
    </SettingStack.Navigator>
  );
};

// Handling authentication logic
const AuthLogic = () => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const { setUserID } = useUser();

  useEffect(() => {
    const init = async () => {
      await initDB();
    };
    init();

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        setUserID(user?.uid ?? null);
      } else {
        setUser(null);
        setUserID(null);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthorizedSignIn">
      {user ? (
        <RootStack.Screen name="GoMain">
          {(props: any) => <TabNavigator {...props} />}
        </RootStack.Screen>
      ) : (
        <RootStack.Screen name="AuthorizedSignIn">
          {(props: any) => <SignInUpStackNavigator {...props} />}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};
// Main App component wrapping everything with necessary providers
const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthLogic />
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
