import React, { useState} from 'react';
import { ForgetPasswordStyles as styles } from '../Styles';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";
import { useTheme } from '../ThemeContext';

import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

type Props = StackScreenProps<SignInUpStackParamList, "ForgetPassword">;

const ForgetPassword = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  //const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  // handle onPress for password update
  const handleUpdatePassword = async() => {
    console.log("Updated Password pressed");
    if(!email){
      Alert.alert("Password cannot be empty.\nPlease enter your password.");
      return;
    }
    //if(!confirmPassword || !(confirmPassword===password)){
    //  Alert.alert("Confirm password is not same as your password.\nPlease ensure confirm password is same as your password.");
    //  return;
    //}
    setLoading(true);
    try{
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert("Password reset email sent!", "Please check your inbox.");
      navigation.navigate('SignIn');
    }catch(error: any){
      console.log("Forget password:" + error);
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      } else {
        Alert.alert("Error", error.message);
      }

      
    }finally{
      setLoading(false);
    }
    
  };

  const handleSignIn = () => {
    console.log("Sign In pressed");
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={require('../img/logo.jpg')} style={styles.logo} />
          </View>

          <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>
            Password Reset
          </Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Email
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>

            
            {/* Password 
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Password
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input]}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>
            */}

            {/* Confirm Password 
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>
              Confirm Password
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input]}
                placeholder="Re-enter your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>
            */}

            {/* Update Password Button */}
            {loading? <ActivityIndicator size="large" color="#0000ff" />
                                      : <>
                        
                                      <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleUpdatePassword}
                                      >
                                        <Text style={styles.buttonText}>Send reset password link to your email.</Text>
                                      </TouchableOpacity>
                                      
                        </>}
            {/**             
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdatePassword}
            >
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
            */}

            {/* Already have an account */}
            <View style={styles.tipsText}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={handleSignIn}>
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
