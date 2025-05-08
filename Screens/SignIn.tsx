import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SignInStyles as styles } from '../src/styles/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../src/contexts/ThemeContext';
import type { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../src/types/Types";

import { FIREBASE_AUTH } from '../src/config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LinearGradient from 'react-native-linear-gradient'; // Import the LinearGradient
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../src/contexts/UserContext';

type Props = StackScreenProps<SignInUpStackParamList, "SignIn">;

const SignIn = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const { setUserID } = useUser();


  // handle onPress
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Sign in failed", "Please fill in email and password.");
      return;
    }

    console.log('Sign In pressed');
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login success:", response.user.email);

      await setUserID(response.user.uid);

      const savedTheme = await AsyncStorage.getItem('userTheme');
      if (savedTheme) {
        console.log("User preferred theme:", savedTheme);
      }

      const backupTime = await AsyncStorage.getItem('lastBackupTime');
      if (!backupTime) {
        const now = new Date().toLocaleString();
        await AsyncStorage.setItem('lastBackupTime', now);
        console.log("Initialized backup time for new user:", now);
      } else {
        console.log("Last backup time:", backupTime);
      }

      // Ensure user ID is available before navigating

      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      }, 100); 



    } catch (error: any) {
      console.log("Login error:", error);
      let message = "Something went wrong. Please try again.";

      if (error.code === "auth/invalid-credential") {
          message = "Invalid email or password.";
      }

      Alert.alert("Sign in failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log('Sign Up pressed');
    navigation.navigate("SignUp");
  };

  const handleForgetPassword = () => {
    console.log('Forget Password pressed');
    navigation.navigate('ForgetPassword');
  };

  // Determine gradient colors based on theme
  const gradientColors = theme === 'dark'
    ? ['#333', '#222222', '#333']
    : ['#F2A7ED', '#FDE6F6', '#D4C3F9'];

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              Welcome Back!
            </Text>
            <View style={styles.formContainer}>
              {/* Email */}
              <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Email</Text>
              <View style={styles.inputWrapper}>
                <Icon name="email-outline" size={20} color="#f57cbb" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email here"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#aaa"
                />
              </View>

              {/* Password */}
              <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-outline" size={20} color="#f57cbb" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#f57cbb" />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <View style={styles.forgotRow}>
                <TouchableOpacity onPress={handleForgetPassword}>
                  <Text
                    style={[
                      styles.forgotText,
                      { color: theme === 'dark' ? '#fff' : '#FF2EAB' }, 
                    ]}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

            {/* Sign In Button */}
            {loading? <ActivityIndicator size="large" color="#0000ff" />
                        : (
                          <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignIn}
                          >
                            <Text style={styles.buttonText}>Sign in</Text>
                          </TouchableOpacity>)
              
              }

            

              {/* Bottom Text */}
              <View style={styles.tipsText}>
                <Text
                  style={[
                    styles.grayText,
                    { color: theme === 'dark' ? '#888888' : '#000' },
                  ]}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text
                    style={[
                      styles.registerLink,
                      { color: theme === 'dark' ? '#fff' : '#FF2EAB' }, 
                    ]}
                  >
                    Sign Up Here
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

export default SignIn;
