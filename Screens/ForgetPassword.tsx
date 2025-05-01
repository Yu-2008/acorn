import React, { useState } from 'react';
import { ForgetPasswordStyles as styles } from '../Styles';
import {Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";

type Props = StackScreenProps<SignInUpStackParamList, "ForgetPassword">

const ForgetPassword = ({route, navigation}: Props) => {
  console.log("Go into Forget Password screen")

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
              <Image source={require('../img/logo.jpg')} style={styles.logo} />
          </View>

          <Text style={styles.title}>Password Reset</Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Update Password Button */}
            <TouchableOpacity style={styles.button} onPress={() => {
                console.log("Update Password Successful");
                navigation.navigate("SignIn");
            }}>
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>

            {/* Already have an account */}
            <View style={styles.tipsText}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.tips}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
