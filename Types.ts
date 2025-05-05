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
      transID: number;
    };
    EditTransaction: {
        transID: number;
        transTitle: string;
        transDate: string;
        transType: string;
        transAmount: number;
        transDescription: string;
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
      expensesID: number,      
      expensesTitle: string;        
      expensesDescription: string;        
    };
    EditExpensesCategory: { 
      expensesID: number, 
      expensesTitle: string;        
      expensesDescription: string;     
    };
  };
  

export type IncomeCategoryParamList = {
    IncomeCategory: undefined;
    AddIncomeCategory: undefined;
    ViewIncomeCategory: {
      incomeID: number
      incomeTitle: string;
      incomeDescription: string;
    };
    EditIncomeCategory: {
      incomeID: number;
      incomeTitle: string;
      incomeDescription: string;
    };
  };

