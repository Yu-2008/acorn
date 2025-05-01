import React, { useState } from 'react';
import { SignUpStyles as styles } from '../Styles';
import { Image,SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from '../Types';

type Props = StackScreenProps<SignInUpStackParamList, "SignUp">

const SignUp = ({route, navigation}: Props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  {/**handle onPress */}
  const handleSignUp=()=>{
    console.log("Sign Up pressed");
    navigation.navigate("SignIn");
  }
  const handleSignIn=()=>{
    console.log('Sign In pressed');
    navigation.navigate("SignIn");
  }

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

          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text style={styles.label}>Email/Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email/Username here"
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

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Already have an account */}
            <View style={styles.tipsText}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={handleSignIn}>
                <Text style={styles.tips}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
