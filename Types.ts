export type RootStackParamList={
    AuthorizedSignIn: undefined,
    GoMain: undefined,
    
}

export type TabParamList={
    AtMain: undefined,
    AddExpenses: undefined,
    AddIncome: undefined,
    GoSetting: undefined,   
    
}

export type SignInUpStackParamList={
    SignIn: undefined,
    SignUp: undefined,
    ForgetPassword: undefined,

}

export type MainStackParamList = {
    Home: undefined;
    ViewTransaction: {
      transTitle: string;
      transDate: string;
      transType: string;
      transAmount: number;
    };
    EditTransaction: {
        transTitle: string;
        transDate: string;
        transType: string;
        transAmount: number;
    };
  };
  
  


export type SettingStackParamList={
    Settings: {onSignOut: ()=> void},
    GoExpensesCategory: undefined,
    GoIncomeCategory: undefined
    GoBackUpCloud: undefined,
}

export type ExpensesCategoryParamList = {
    ExpensesCategory: undefined;
    AddExpensesCategory: undefined;
    ViewExpensesCategory: {        
      expensesTitle: string;        
      expensesDescription: string;  
      expensesDate: string;  
      expensesAmount: number;        
    };
    EditExpensesCategory: {  
      expensesTitle: string;        
      expensesDescription: string;  
      expensesDate: string;    
      expensesAmount: number;       
    };
  };
  

export type IncomeCategoryParamList = {
    IncomeCategory: undefined;
    AddIncomeCategory: undefined;
    ViewIncomeCategory: {
      incomeTitle: string;
      incomeDescription: string;
      incomeDate: string;
      incomeAmount: number;
    };
    EditIncomeCategory: {
      incomeTitle: string;
      incomeDescription: string;
      incomeDate: string;
      incomeAmount: number;
    };
  };

