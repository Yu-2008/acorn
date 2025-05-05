import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from '../Types';
import { useTheme } from '../ThemeContext';
import { SignUpStyles as styles } from '../Styles';

import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';


type Props = StackScreenProps<SignInUpStackParamList, "SignUp">;

const SignUp = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const validateEmail = async(email: string): Promise<boolean> => {
    try {
      const url =  `https://emailvalidation.abstractapi.com/v1/?api_key=32bad148cbbc439d81a84df08cad81be&email=${email}`;
      const response = await fetch(url);
      const data = await response.json();

      const isValidFormat = data.is_valid_format?.value;
      const isMxFound = data.is_mx_found?.value;

      return isValidFormat && isMxFound;
    } catch (error) {
      console.error("Error validating email:", error);
      return false;
    }
  };

  {/**handle onPress */}
  const handleSignUp = async() => {
    //console.log("Sign Up pressed");
    //navigation.navigate("SignIn");

    console.log('Sign Up pressed');
    if (!email || !password || !confirmPassword) {
      Alert.alert("All fields are required.");
      return;
    }
    const isValid = await validateEmail(email);
    
    if (!isValid) {
      Alert.alert("Invalid email format. Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }
    
    
    setLoading(true);
    try{
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      Alert.alert("Sign Up successful.\nPlease check your email.");
      //navigation.navigate("SignIn");
    }catch(error: any){
      console.log(error);
      Alert.alert("Sign Up failed: " + error.message);
    }finally{
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log('Sign In pressed');
    navigation.navigate("SignIn");
  };

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
            Sign Up
          </Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text
              style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]} 
            >
              Email/Username
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input]} 
                placeholder="Enter your Email/Username here"
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
                style={[styles.input]} 
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
                style={[styles.input]} 
                placeholder="Re-enter your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
              />
            </View>

            {/* Sign Up Button */}
            {loading? <ActivityIndicator size="large" color="#0000ff" />
                          : <>
            
                          <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignUp}
                          >
                            <Text style={styles.buttonText}>Sign Up</Text>
                          </TouchableOpacity>
                          
            </>}

            {/** 
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            */}

            {/* Already have an account */}
            <View style={styles.tipsText}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text
                  style={[
                    styles.tips,
                    { color: theme === 'dark' ? '#fff' : '#000' }, 
                  ]}
                >
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

export default SignUp;
