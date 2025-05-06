import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const db = SQLite.openDatabase({ name: 'budgetApp.db', location: 'default' });

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

    await database.executeSql(`
        CREATE TABLE IF NOT EXISTS incomeCategory (
          incomeCategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
          incomeCategoryTitle TEXT NOT NULL,
          incomeCategoryDescription TEXT,
          incomeIconName TEXT,
          incomeIconLibrary TEXT,
          userID TEXT NOT NULL,
          FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE,
          UNIQUE (userID, incomeCategoryTitle)
          );
        `);
    console.log("incomeCategory table created/already exists.");

    await database.executeSql(`
        CREATE TABLE IF NOT EXISTS expensesCategory (
            expensesCategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
            expensesCategoryTitle TEXT NOT NULL,
            expensesCategoryDescription TEXT,
            expensesIconName TEXT,
            expensesIconLibrary TEXT,
            userID TEXT NOT NULL,
            FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE,
            UNIQUE (userID, expensesCategoryTitle)
            );
    
        `);
        console.log("expensesCategory table created/already exists.");


    await database.executeSql(`
        CREATE TABLE IF NOT EXISTS transactionHistory (
            transID INTEGER PRIMARY KEY AUTOINCREMENT,
            transType INTEGER NOT NULL CHECK (transType IN (0, 1)), -- 0 = income, 1 = expenses
            transCategory TEXT NOT NULL,
            transTitle TEXT NOT NULL,
            transactionDate INTEGER NOT NULL, -- Unix timestamp (e.g. from Date.now())
            amount REAL NOT NULL,
            description TEXT,
            userID TEXT NOT NULL,
            FOREIGN KEY (userID) REFERENCES userAcc(userID) ON DELETE CASCADE
            );
        `);
    console.log("transactionHistory table created/already exists.");
 


  } catch (error) {
    console.log("SQLite DB init error:", error);
  }

};

const predefinedIncomeCategories = [
    { title: "Salary", iconName: "wallet", iconLibrary: "Ionicons" },
    { title: "Side Income", iconName: "cash", iconLibrary: "Ionicons" },
    { title: "Investment", iconName: "chart-line", iconLibrary: "FontAwesome5" },
    { title: "Others", iconName: "ellipsis-h", iconLibrary: "FontAwesome5" },
  ];
  
  const predefinedExpensesCategories = [
    { title: "Food", iconName: "fast-food", iconLibrary: "Ionicons" },
    { title: "Utilities", iconName: "flash", iconLibrary: "Ionicons" },
    { title: "Entertainment", iconName: "game-controller", iconLibrary: "Ionicons" },
    { title: "Education", iconName: "school", iconLibrary: "Ionicons" },
    { title: "Medication", iconName: "medkit", iconLibrary: "Ionicons" },
    { title: "Others", iconName: "ellipsis-h", iconLibrary: "FontAwesome5" },
  ];

//insert record
export const insertUser = async (userID: string, username: string) => {
  try {
    const database = await db;
    await database.executeSql(
      `INSERT OR REPLACE INTO userAcc (userID, username) VALUES (?, ?)`,
      [userID, username]
    );

    // Insert predefined income categories
    for (const category of predefinedIncomeCategories) {
        await database.executeSql(
          `INSERT INTO incomeCategory (incomeCategoryTitle, incomeCategoryDescription, incomeIconName, incomeIconLibrary, userID)
           VALUES (?, NULL, ?, ?, ?)`,
          [category.title, category.iconName, category.iconLibrary, userID]
        );
    }
  
    // Insert predefined expenses categories
    for (const category of predefinedExpensesCategories) {
        await database.executeSql(
          `INSERT INTO expensesCategory (expensesCategoryTitle, expensesCategoryDescription, expensesIconName, expensesIconLibrary, userID)
           VALUES (?, NULL, ?, ?, ?)`,
          [category.title, category.iconName, category.iconLibrary, userID]
        );
    }

    console.log("User inserted locally with predefined categories.");
  } catch (error) {
    console.log("INSERT USER ERROR: ", error);
  }

  
};

export const insertTransactionHistory = async ({
    transType,
    transCategory,
    transTitle,
    transactionDate,
    amount,
    description,
    userID,
  }: {
    transType: 0 | 1; // 0 = income, 1 = expenses
    transCategory: string;
    transTitle: string;
    transactionDate: number; // Unix timestamp (e.g., from Date.now())
    amount: number;
    description?: string;
    userID: string;
  }) => {
    try {
      const database = await db;
      await database.executeSql(
        `INSERT INTO transactionHistory (transType, transCategory, transTitle, transactionDate, amount, description, userID)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          transType,
          transCategory,
          transTitle,
          transactionDate,
          amount,
          description || null,
          userID,
        ]
      );
      console.log("Transaction inserted successfully.");
    } catch (error) {
      console.error("INSERT TRANSACTION ERROR: ", error);
    }
  };
  

export const insertIncomeCategory = async ({
    title,
    description,
    incomeIconName,
    incomeIconLibrary,
    userID
  }: {
    title: string;
    description: string;
    incomeIconName: string;
    incomeIconLibrary: string;
    userID: string;
  }) => {
    const database = await db;
    await database.executeSql(
      `INSERT INTO incomeCategory (incomeCategoryTitle, incomeCategoryDescription, incomeIconName, incomeIconLibrary, userID)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, incomeIconName, incomeIconLibrary, userID]
    );
};

export const insertExpensesCategory = async ({
    title,
    description,
    expensesIconName,
    expensesIconLibrary,
    userID
  }: {
    title: string;
    description: string;
    expensesIconName: string;
    expensesIconLibrary: string;
    userID: string;
  }) => {
    const database = await db;
    await database.executeSql(
      `INSERT INTO expensesCategory (expensesCategoryTitle, expensesCategoryDescription, expensesIconName, expensesIconLibrary, userID)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, expensesIconName, expensesIconLibrary, userID]
    );
};


//get record
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

export const getIncomeCategories = async (userID: string) => {
    try {
      const database = await db;
      const [result] = await database.executeSql(
        `SELECT * FROM incomeCategory WHERE userID = ?`,
        [userID]
      );
      let incomeCategories = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        incomeCategories.push({
          id: row.incomeCategoryID,
          title: row.incomeCategoryTitle,
          description: row.incomeCategoryDescription || '',
          icon: row.incomeIconName || 'cash',
          iconLibrary: row.incomeIconLibrary || 'Ionicons',
        });
      }
      return incomeCategories;
    } catch (error) {
      console.log("GET INCOME CATEGORIES ERROR: ", error);
      return [];
    }
  };


  export const getExpensesCategories = async (userID: string) => {
    try {
      const database = await db;
      const [result] = await database.executeSql(
        `SELECT * FROM expensesCategory WHERE userID = ?`,
        [userID]
      );
      let expensesCategories = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        expensesCategories.push({
          id: row.expensesCategoryID,
          title: row.expensesCategoryTitle,
          description: row.expensesCategoryDescription || '',
          icon: row.expensesIconName || 'file-tray',
          iconLibrary: row.expensesIconLibrary || 'Ionicons',
        });
      }
      return expensesCategories;
    } catch (error) {
      console.log("GET EXPENSES CATEGORIES ERROR: ", error);
      return [];
    }
  };

export const getUsernameById = async (userID: string): Promise<string | null> => {
    try {
        const database = await db;
        const [result] = await database.executeSql(
            `SELECT username FROM userAcc WHERE userID = ?`,
            [userID]
        );
        if (result.rows.length > 0) {
            return result.rows.item(0).username as string;
        }
        return null;
    } catch (error) {
        console.error("GET USERNAME ERROR: ", error);
        return null;
    }
};

export const getTransactionByTransId = async (transID: number) => {
    try {
      const database = await db;
      const [result] = await database.executeSql(
        `SELECT * FROM transactionHistory WHERE transID = ?`,
        [transID]
      );
      if (result.rows.length === 0) return null;
  
      const row = result.rows.item(0);

      // row.transCategory is the numeric ID (as TEXT)
      const catId = parseInt(row.transCategory, 10);
      let catRecord;
      if (row.transType === 0) {
        catRecord = await getIncomeCategoryById(catId);
      } else {
        catRecord = await getExpensesCategoryById(catId);
      }
      const categoryTitle = catRecord?.title ?? "";

      return {
        transID: row.transID,
        transType: row.transType,
        transCategory: categoryTitle,
        transTitle: row.transTitle,
        transactionDate: row.transactionDate,
        amount: row.amount,
        description: row.description,
        userID: row.userID,
      };
    } catch (error) {
      console.error("GET TRANSACTION BY ID ERROR:", error);
      return null;
    }
  };
  

export const getIncomeCategoryById = async (incomeId: number) => {
    try{
        const database = await db;
        const [result] = await database.executeSql(
            `SELECT * FROM incomeCategory WHERE incomeCategoryID = ?`,
            [incomeId]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows.item(0);
        return {
            id: row.incomeCategoryID,
            title: row.incomeCategoryTitle,
            description: row.incomeCategoryDescription,
            icon: row.incomeIconName,
            iconLibrary: row.incomeIconLibrary,
        };

    }catch(error){
        console.log("GET INCOME CATEGORIES ITEM ERROR: ", error);
    }
    
};

export const getExpensesCategoryById = async (expensesId: number) => {
    try{
        const database = await db;
        const [result] = await database.executeSql(
            `SELECT * FROM expensesCategory WHERE expensesCategoryID = ?`,
            [expensesId]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows.item(0);
        return {
            id: row.expensesCategoryID,
            title: row.expensesCategoryTitle,
            description: row.expensesCategoryDescription,
            icon: row.expensesIconName,
            iconLibrary: row.expensesIconLibrary,
        };

    }catch(error){
        console.log("GET EXPENSES CATEGORIES ITEM ERROR: ", error);
    }
    
};

export const getTransactionHistoryById = async (
    userID: string,
    minTimestamp: number = 0
    ) => {
    try {
      const database = await db;
      const [result] = await database.executeSql(
        `SELECT * FROM transactionHistory
            WHERE userID = ? AND transactionDate >= ?
            ORDER BY transactionDate DESC`,
        [userID, minTimestamp]
      );
      const transactions: {
        transID: number;
        transType: 0 | 1;
        transCategory: string;
        transTitle: string;
        transactionDate: number;
        amount: number;
        description: string | null;
      }[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        transactions.push({
          transID: row.transID,
          transType: row.transType,
          transCategory: row.transCategory,
          transTitle: row.transTitle,
          transactionDate: row.transactionDate,
          amount: row.amount,
          description: row.description,
        });
      }
      return transactions;
    } catch (error) {
      console.error("GET TRANSACTIONS ERROR", error);
      return [];
    }
  };
  


//update
export const updateTransactionById = async ({
    transID,
    transType,
    transCategory,
    transTitle,
    transactionDate,
    amount,
    description
  }: {
    transID: number;
    transType: 0 | 1;
    transCategory: string;
    transTitle: string;
    transactionDate: number;
    amount: number;
    description?: string;
  }) => {
    try {
      const database = await db;
      await database.executeSql(
        `UPDATE transactionHistory
         SET transType = ?, transCategory = ?, transTitle = ?, transactionDate = ?, amount = ?, description = ?
         WHERE transID = ?`,
        [transType, transCategory, transTitle, transactionDate, amount, description || null, transID]
      );
      console.log("Transaction updated successfully.");
    } catch (error) {
      console.error("UPDATE TRANSACTION ERROR:", error);
    }
  };
  
export const updateIncomeCategory = async ({
    id,
    title,
    description,
  }: {
    id: number;
    title: string;
    description: string;
  }) => {
    try{
        const database = await db;
        await database.executeSql(
            `UPDATE incomeCategory 
                SET incomeCategoryTitle = ?, incomeCategoryDescription = ?
                WHERE incomeCategoryID = ?`,
            [title, description, id]
        );
    }catch(error){
        console.error("UPDATE INCOME CATEGORY error: ", error);
    }
    
};

export const updateExpensesCategory = async ({
    id,
    title,
    description,
  }: {
    id: number;
    title: string;
    description: string;
  }) => {
    try{
        const database = await db;
        await database.executeSql(
            `UPDATE expensesCategory 
                SET expensesCategoryTitle = ?, expensesCategoryDescription = ?
                WHERE expensesCategoryID = ?`,
            [title, description, id]
        );
    }catch(error){
        console.error("UPDATE EXPENSES CATEGORY error: ", error);
    }
    
};


//delete
export const deleteTransactionById = async (transID: number) => {
    try {
        const database = await db;
        await database.executeSql(
        `DELETE FROM transactionHistory WHERE transID = ?`,
        [transID]
        );
        console.log("Transaction deleted successfully.");
    } catch (error) {
        console.error("DELETE TRANSACTION ERROR:", error);
    }
};
  
export const deleteIncomeCategory = async (id: number) => {
    try{
        const database = await db;
        await database.executeSql(
            `DELETE FROM incomeCategory 
                WHERE incomeCategoryID = ?`,
            [id]
        );
    }catch(error){
        console.error("DELETE INCOME CATEGORY error: ", error);
    }
    
};
export const deleteExpensesCategory = async (id: number) => {
    try{
        const database = await db;
        await database.executeSql(
            `DELETE FROM expensesCategory 
                WHERE expensesCategoryID = ?`,
            [id]
        );
    }catch(error){
        console.error("DELETE EXPENSES CATEGORY error: ", error);
    }
    
};



//for back up JSON file
export const exportAllTablesToJson = async (): Promise<string> => {
  try {
    const database = await db;
    const result: Record<string, any[]> = {};
    const tables = ['userAcc', 'incomeCategory', 'expensesCategory', 'transactionHistory'];

    for (const table of tables) {
      const [res] = await database.executeSql(`SELECT * FROM ${table}`);
      const arr: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        arr.push(res.rows.item(i));
      }
      result[table] = arr;
    }

    return JSON.stringify(result, null, 2); // prettified JSON
  } catch (error) {
    console.error('EXPORT DB TO JSON ERROR: ', error);
    return '{}';
  }
};


export const restoreFromJson = async (data: Record<string, any[]>) => {
  try {
    const database = await db;

    for (const [table, rows] of Object.entries(data)) {
      for (const row of rows) {
        const keys = Object.keys(row);
        const values = keys.map(key => row[key]);
        const placeholders = keys.map(() => '?').join(', ');

        const sql = `INSERT OR REPLACE INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
        await database.executeSql(sql, values);
      }
    }

    console.log("Database restored from JSON.");
  } catch (error) {
    console.error("RESTORE DB FROM JSON ERROR: ", error);
  }
};
