import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity, FlatList } from "react-native";
import type { StackScreenProps } from '@react-navigation/stack';
import { IncomeCategoryParamList } from "../Types";
import { IncomeCategoryStyles as styles } from "../Styles";

type Props = StackScreenProps<IncomeCategoryParamList, 'IncomeCategory'>;

const IncomeCategory = ({ route, navigation }: Props) => {
  const [data, setData] = useState([
    { id: 1, title: 'Salary' },
    { id: 2, title: 'Side Income' }
  ]);



  const handleAddMore = () => {
    const newItem = { id: data.length + 1, title: `New Item ${data.length + 1}` };
    setData([...data, newItem]);
  };

  const handleDelete = () => {
    setData(prev => prev.slice(0, -1));
  };

  const renderItem = ({ item }: { item: { id: number, title: string } }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewIncomeCategory', { incomeID: item.id })}
      style={{
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <View style={{ width: 30, height: 30, backgroundColor: '#E0E0E0', borderRadius: 5, marginRight: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F5F2' }}>
      {/* Add Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('AddIncomeCategory')}>
          <Text style={{ color: 'grey', marginRight: 15 }}>Add More</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default IncomeCategory;
