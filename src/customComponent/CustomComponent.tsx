import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";


// get icon
export const GetIcon = ({
    library,
    name,
    color,
    size,
  }: {
    library: 'Ionicons' | 'FontAwesome' | 'FontAwesome5';
    name: string;
    color: string;
    size?: number;
  }) => {
    const iconProps = { name, size, color };
  
    switch (library) {
      case 'Ionicons':
        return <Ionicons {...iconProps} />;
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 {...iconProps} />;
      default:
        return <Ionicons {...iconProps} name="file-tray" />;
    }
  };


//  shows the calender to let user selected date
type CalenderProps = {
  date: Date;
  show: boolean;
  setShow: (val: boolean) => void;
  onChange: (event: any, date?: Date) => void;
  theme: 'light' | 'dark';
  style: {
    datePickerButton: object;
    dateText: object;
  };
};

export const CalenderPicker = ({
  date,
  show,
  setShow,
  onChange,
  theme,
  style,
}: CalenderProps) => {
  return (
    <>
      <TouchableOpacity style={style.datePickerButton} onPress={() => setShow(true)}>
        <Text style={[style.dateText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};


// get category
export const CategoryPicker = ({
  categories,
  selectedCategory,
  onValueChange,
  theme,
  style,
}: {
  categories: { id: number; title: string }[];
  selectedCategory: number | undefined;
  onValueChange: (val: number) => void;
  theme: 'light' | 'dark';
  style: any;
}) => (
  <>
   <View style={style.pickerContainer}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={onValueChange}
        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.id} label={cat.title} value={cat.id} />
        ))}
      </Picker>
    </View>
  </>
);


// for location
export const LocationToggle = ({
  value,
  onToggle,
  loading,
  location,
  theme,
  style,
}: {
  value: boolean;
  onToggle: (checked: boolean) => void;
  loading: boolean;
  location: string;
  theme: 'light' | 'dark';
  style: any;
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <CheckBox value={value} onValueChange={onToggle} />
    <Text style={[style.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Record Current Location</Text>
    {loading ? (
      <ActivityIndicator size="small" color={theme === 'dark' ? '#fff' : '#000'} />
    ) : (
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
        {value ? `Current Location: ${location}` : "Not showing location."}
      </Text>
    )}
  </View>
);


