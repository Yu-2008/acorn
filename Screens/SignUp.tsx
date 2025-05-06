import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from '../Types';
import { useTheme } from '../ThemeContext';
import { SignUpStyles as styles } from '../Styles';

import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { insertUser } from '../SQLite';
import LinearGradient from 'react-native-linear-gradient'; 

type Props = StackScreenProps<SignInUpStackParamList, "SignUp">;

const SignUp = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const validateEmail = async (email: string): Promise<boolean> => {
    try {
      const url = `https://emailvalidation.abstractapi.com/v1/?api_key=711372f9b8114ed1a7a52568bdbd0c16&email=${email}`;
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

  // handle onPress
  const handleSignUp = async () => {
    console.log('Sign Up pressed');
    setLoading(true);

    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("All fields are required.");
      setLoading(false);
      return;
    }

    const isValid = await validateEmail(email);

    if (!isValid) {
      Alert.alert("Invalid email format. Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      const userID = response.user.uid;
      console.log("Firebase signup success. UID:", userID);

      await insertUser(userID, username);
      console.log("Insert new user success. UID:", userID);
      Alert.alert("Sign Up successful.\nPlease check your email.");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Sign Up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log('Sign In pressed');
    navigation.navigate("SignIn");
  };

  // Determine gradient colors based on theme
  const gradientColors = theme === 'dark'
    ? ['#333', '#222222', '#333']
    : ['#F2A7ED', '#FDE6F6', '#D4C3F9'];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Apply LinearGradient to wrap the entire screen */}
      <LinearGradient
        colors={gradientColors}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image source={require('../img/logo.jpg')} style={styles.logo} />
            </View>

            <Text
              style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}
            >
              Sign Up
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
                  style={styles.input}
                  placeholder="Enter your Email here"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
                />
              </View>

              {/* Username */}
              <Text
                style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}
              >
                Username
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Username here"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
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
                  style={styles.input}
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
                  style={styles.input}
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

              {/* Already have an account */}
              <View style={styles.tipsText}>
                <Text
                  style={{
                    color: theme === 'dark' ? '#fff' : '#000',
                  }}
                >
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text
                    style={[
                      styles.tips,
                      { color: theme === 'dark' ? '#fff' : '#FF2EAB' },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUp;
