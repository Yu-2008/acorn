import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the context value
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to safely use the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(Appearance.getColorScheme() || 'light');
  const [isUserSet, setIsUserSet] = useState(false);

  // Load the saved theme from AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('userTheme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        setIsUserSet(true);
      } else {
        const systemTheme = Appearance.getColorScheme() || 'light';
        setTheme(systemTheme);
        await AsyncStorage.setItem('userTheme', systemTheme);
      }
    };
    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isUserSet) {
        setTheme(colorScheme || 'light');
      }
    });

    return () => listener.remove();
  }, [isUserSet]);

  // Toggle between light and dark
  const toggleTheme = async() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsUserSet(true);
    await AsyncStorage.setItem('userTheme', newTheme);
  };

  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
