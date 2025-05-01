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

export type MainStackParamList={
    Main: undefined,
    ViewTransaction: {
        transID: number,
    },
    EditTransaction: {
        transID: number,
    },

}

export type SettingStackParamList={
    Settings: {onSignOut: ()=> void},
    GoExpensesCategory: undefined,
    GoIncomeCategory: undefined
    GoBackUpCloud: undefined,
}

export type ExpensesCategoryParamList={
    ExpensesCategory: undefined,
    AddExpensesCategory: undefined,
    ViewExpensesCategory: {
        expensesID: number,
    },
    EditExpensesCategory: {
        expensesID: number,
    },
}

export type IncomeCategoryParamList={
    IncomeCategory: undefined,
    AddIncomeCategory: undefined,
    ViewIncomeCategory: {
        incomeID: number,
    },
    EditIncomeCategory: {
        incomeID: number,
    },
}