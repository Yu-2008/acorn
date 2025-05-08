import React, { useState } from "react";
import { IncomeCategoryStyles as styles } from '../src/styles/Styles';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList} from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from "../src/types/Types";
import { useTheme } from '../src/contexts/ThemeContext';
import { useUser } from "../src/contexts/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { getIncomeCategories } from "../src/database/database";
import { GetIcon } from "../src/customComponent/CustomComponent";
type Props = StackScreenProps<IncomeCategoryParamList, 'IncomeCategory'>;

type IncomeCategory = {
  id: number;
  title: string;
  description: string;
  icon: string; 
  iconLibrary: string; 
}


const IncomeCategory = ({ navigation }: Props) => {
  const { userID } = useUser();
  const { theme } = useTheme();
  const [data, setData] = useState<IncomeCategory[]>([]);


  useFocusEffect(
    React.useCallback(() => {
      const loadIncomeCategories = async () => {
        if (userID) {
          const categories = await getIncomeCategories(userID);
          categories.sort((a, b) => a.title.localeCompare(b.title));
          setData(categories); 
        } else {
          console.log("Cannot get user ID.");
        }
      };
      
      loadIncomeCategories();
    }, [userID])
  );
  


  {/**handle onPress */}
  const handleAddMore =()=>{
    console.log("Add More pressed");
    navigation.navigate('AddIncomeCategory')
  }
   // Handler for navigating to ViewIncomeCategory screen
  const handleView =(item: any)=>{
    navigation.navigate('ViewIncomeCategory', { 
      incomeID: item.id,
      incomeTitle: item.title, 
      incomeDescription: item.description
    })

  }

  const renderIcon = (iconName: string, iconLibrary: string) => {
    const color = theme === 'dark' ? 'white' : '#393533';
    const size = 24;

    return (
      <View style={styles.icon}>
      <GetIcon
        library={iconLibrary as 'Ionicons' | 'FontAwesome' | 'FontAwesome5'}
        name={iconName}
        color={color}
        size={size}
      />
      </View>
    );
  };

  
  const renderItem = ({ item }: { item: IncomeCategory }) => (
    <TouchableOpacity
      onPress={() => handleView(item)}
      style={[
        styles.itemRow, 
        { backgroundColor: theme === 'dark' ? '#444' : '#FFC1DA' }  // Dynamic background color
      ]}
    >
      {renderIcon(item.icon, item.iconLibrary)}
      <Text style={[styles.itemText, { color: theme === 'dark' ? 'white' : 'black' }]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  

  

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      {/* Add Buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAddMore}>
         <Text style={[styles.actionText, { color: theme === 'dark' ? '#fff' : '#f57cbb' }]}>Add More</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
      />
    </SafeAreaView>
  );
};

export default IncomeCategory;
