import React, { useState, useContext } from 'react';
import { ForgetPasswordStyles as styles } from '../Styles';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";
import { useTheme } from '../ThemeContext';

type Props = StackScreenProps<SignInUpStackParamList, "ForgetPassword">;

const ForgetPassword = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }, 
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../img/logo.jpg')} style={styles.logo} />
          </View>

          <Text
            style={[
              styles.title,
              { color: theme === 'dark' ? '#fff' : '#000' }, 
            ]}
          >
            Password Reset
          </Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text
              style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]} 
            >
              Email
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]} 
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>

            {/* Password */}
            <Text
              style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]} 
            >
              Password
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]} 
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>

            {/* Confirm Password */}
            <Text
              style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]} 
            >
              Confirm Password
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
                placeholder="Re-enter your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>

            {/* Update Password Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log("Update Password Successful");
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>

            {/* Already have an account */}
            <View style={styles.tipsText}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={[styles.tips, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
