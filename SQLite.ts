import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = SQLite.openDatabase({ name: 'budgetApp.db', location: 'default' });

export const initDB = async () => {
  try {
    const database = await db;
    await database.executeSql(`
      CREATE TABLE IF NOT EXISTS userAcc (
        userID TEXT PRIMARY KEY NOT NULL,
        username TEXT NOT NULL
      );
    `);
    console.log("userAcc table created/already exists.");
  } catch (error) {
    console.log("SQLite DB init error for userAcc table:", error);
  }

  try {
    const database = await db;
    await database.executeSql(`
      CREATE TABLE IF NOT EXISTS incomeCategory (
        incomeCategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
        incomeCategoryTitle TEXT NOT NULL,
        incomeCategoryDescription TEXT,
        userID TEXT NOT NULL,
        FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE,
        UNIQUE (userID, incomeCategoryTitle)
        );
    `);
    console.log("incomeCategory table created/already exists.");
    
  }catch (error){
    console.log("SQLite DB init error for incomeCategory table:", error);
  }

  try {
    const database = await db;
    await database.executeSql(`
       CREATE TABLE IF NOT EXISTS expensesCategory (
        expensesCategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
        expensesCategoryTitle TEXT NOT NULL,
        expensesCategoryDescription TEXT,
        userID TEXT NOT NULL,
        FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE,
        UNIQUE (userID, expensesCategoryTitle)
        );

    `);
    console.log("expensesCategory table created/already exists.");
    
  }catch (error){
    console.log("SQLite DB init error for expensesCategory table:", error);
  }

  try {
    const database = await db;
    await database.executeSql(`
       CREATE TABLE IF NOT EXISTS transactionHistory (
        transID INTEGER PRIMARY KEY AUTOINCREMENT,
        transType INTEGER NOT NULL CHECK (transType IN (0, 1)), -- 0 = income, 1 = expenses
        transTitle TEXT NOT NULL,
        transactionDate INTEGER NOT NULL, -- Unix timestamp (e.g. from Date.now())
        amount REAL NOT NULL,
        description TEXT,
        userID TEXT NOT NULL,
        FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE
        );
    `);
    console.log("transactionHistory table created/already exists.");
    
  }catch (error){
    console.log("SQLite DB init error for transactionHistory table:", error);
  }

};

const predefinedIncomeCategories = [
    "Salary",
    "Side Income",
    "Investment",
    "Others"
  ];
  
const predefinedExpensesCategories = [
"Food",
"Utilities",
"Entertainment",
"Education",
"Medication",
"Others"
];

export const insertUser = async (userID: string, username: string) => {
  try {
    const database = await db;
    await database.executeSql(
      `INSERT OR REPLACE INTO userAcc (userID, username) VALUES (?, ?)`,
      [userID, username]
    );

    // Insert predefined income categories
    for (const title of predefinedIncomeCategories) {
        await database.executeSql(
          `INSERT INTO incomeCategory (incomeCategoryTitle, incomeCategoryDescription, userID) VALUES (?, NULL, ?)`,
          [title, userID]
        );
      }
  
    // Insert predefined expenses categories
    for (const title of predefinedExpensesCategories) {
    await database.executeSql(
        `INSERT INTO expensesCategory (expensesCategoryTitle, expensesCategoryDescription, userID) VALUES (?, NULL, ?)`,
        [title, userID]
    );
    }
    console.log("User inserted locally with predefined categories.");
  } catch (error) {
    console.log("INSERT USER ERROR: ", error);
  }

  
};

export const getUser = async (userID: string) => {
  try {
    const database = await db;
    const [result] = await database.executeSql(
      `SELECT * FROM userAcc WHERE userID = ?`,
      [userID]
    );
    if (result.rows.length > 0) {
      return result.rows.item(0);
    }
    return null;
  } catch (error) {
    console.log("GET USER ERROR: ", error);
    return null;
  }
};
