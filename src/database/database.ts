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
            location TEXT,
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
    { title: "Freelancing", iconName: "laptop", iconLibrary: "Ionicons" },
    { title: "Investment", iconName: "chart-line", iconLibrary: "FontAwesome5" },
    { title: "Gifts", iconName: "gift", iconLibrary: "Ionicons"},
    { title: "Dividend", iconName: "money-bill-wave", iconLibrary: "FontAwesome5" },
    { title: "Government Aid", iconName: "business", iconLibrary: "Ionicons" },
    { title: "Scholarship", iconName: "ribbon", iconLibrary: "Ionicons" },
    { title: "Tips", iconName: "thumbs-up", iconLibrary: "Ionicons" },
    { title: "Intellectual Property", iconName: "bulb", iconLibrary: "Ionicons" },
    { title: "Others", iconName: "ellipsis-h", iconLibrary: "FontAwesome5" },
  ];
  
  const predefinedExpensesCategories = [
    { title: "Food", iconName: "fast-food", iconLibrary: "Ionicons" },
    { title: "Utilities", iconName: "flash", iconLibrary: "Ionicons" },
    { title: "Entertainment", iconName: "game-controller", iconLibrary: "Ionicons" },
    { title: "Education", iconName: "school", iconLibrary: "Ionicons" },
    { title: "Childcare", iconName: "baby", iconLibrary: "FontAwesome5" },
    { title: "Clothing", iconName: "shirt", iconLibrary: "Ionicons" },
    { title: "Personal Care", iconName: "cut", iconLibrary: "Ionicons" },
    { title: "Transportation", iconName: "car", iconLibrary: "Ionicons" },
    { title: "Medication", iconName: "medkit", iconLibrary: "Ionicons" },
    { title: "Pets", iconName: "paw", iconLibrary: "FontAwesome5" },
    { title: "Travel", iconName: "airplane", iconLibrary: "Ionicons" },
    { title: "Subscription", iconName: "logo-youtube", iconLibrary: "Ionicons" },
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
    location,
    userID,
  }: {
    transType: 0 | 1; // 0 = income, 1 = expenses
    transCategory: string;
    transTitle: string;
    transactionDate: number; // Unix timestamp (e.g., from Date.now())
    amount: number;
    description?: string;
    location?: string;
    userID: string;
  }) => {
    try {
      const database = await db;
      await database.executeSql(
        `INSERT INTO transactionHistory (transType, transCategory, transTitle, transactionDate, amount, description, location, userID)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          transType,
          transCategory,
          transTitle,
          transactionDate,
          amount,
          description || null,
          location || null,
          userID,
        ]
      );
      console.log("Transaction inserted successfully.");
    } catch (error) {
      console.log("INSERT TRANSACTION ERROR: ", error);
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
        console.log("GET USERNAME ERROR: ", error);
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
        location: row.location,
        userID: row.userID,
      };
    } catch (error) {
      console.log("GET TRANSACTION BY ID ERROR:", error);
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
        location: string | null;
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
          location: row.location,
        });
      }
      return transactions;
    } catch (error) {
      console.log("GET TRANSACTIONS ERROR", error);
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
    description,
    location,
  }: {
    transID: number;
    transType: 0 | 1;
    transCategory: string;
    transTitle: string;
    transactionDate: number;
    amount: number;
    description?: string;
    location?: string;
  }) => {
    try {
      const database = await db;
      await database.executeSql(
        `UPDATE transactionHistory
         SET transType = ?, transCategory = ?, transTitle = ?, transactionDate = ?, amount = ?, description = ?, location = ?
         WHERE transID = ?`,
        [transType, transCategory, transTitle, transactionDate, amount, description || null, location, transID]
      );
      console.log("Transaction updated successfully.");
    } catch (error) {
      console.log("UPDATE TRANSACTION ERROR:", error);
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
        console.log("UPDATE INCOME CATEGORY error: ", error);
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
        console.log("UPDATE EXPENSES CATEGORY error: ", error);
    }
    
};


//delete
export const deleteUserAccById = async (userID: string) => {
  try {
    const database = await db;
    
    // Delete the user’s data from the userAcc table
    // also delete related data because of the ON DELETE CASCADE in the foreign keys
    await database.executeSql(`DELETE FROM userAcc WHERE userID = ?`, [userID]);
    
    console.log(`User with ID ${userID} and all related data deleted.`);
  } catch (error) {
    console.log("DELETE USER ACCOUNT ERROR: ", error);
  }
};


export const deleteTransactionById = async (transID: number) => {
    try {
        const database = await db;
        await database.executeSql(
        `DELETE FROM transactionHistory WHERE transID = ?`,
        [transID]
        );
        console.log("Transaction deleted successfully.");
    } catch (error) {
        console.log("DELETE TRANSACTION ERROR:", error);
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
        console.log("DELETE INCOME CATEGORY error: ", error);
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
        console.log("DELETE EXPENSES CATEGORY error: ", error);
    }
    
};



//for back up JSON file
export const exportAllTablesToJson = async (userId: string): Promise<string> => {
  try {
    const database = await db;
    const result: Record<string, any[]> = {};
    const tables = ['userAcc', 'incomeCategory', 'expensesCategory', 'transactionHistory'];

    for (const table of tables) {
      const [res] = await database.executeSql(`SELECT * FROM ${table} WHERE userID=?`, [userId]);
      const arr: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        arr.push(res.rows.item(i));
      }
      result[table] = arr;
    }

    return JSON.stringify(result, null, 2); // prettified JSON
  } catch (error) {
    console.log('EXPORT DB TO JSON ERROR: ', error);
    return '{}';
  }
};


export const restoreFromJson = async (userId: string, data: Record<string, any[]>) => {
  try {
    const database = await db;

    for (const [table, rows] of Object.entries(data)) {
      for (const row of rows) {

        // Ensure userID matches the current user for tables besides userAcc
        if (table !== 'userAcc') {
          row.userID = userId;
        }

        const keys = Object.keys(row);    //col name
        const values = keys.map(key => row[key]);   //value to insert
        const placeholders = keys.map(() => '?').join(', ');

        const sql = `INSERT OR REPLACE INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
        await database.executeSql(sql, values);
      }
    }

    console.log("Database restored from JSON.");
  } catch (error) {
    console.log("RESTORE DB FROM JSON ERROR: ", error);
  }
};
