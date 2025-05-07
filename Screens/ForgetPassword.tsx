import React, { useState } from 'react';
import { ForgetPasswordStyles as styles } from '../src/styles/Styles';
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../src/types/Types";
import { useTheme } from '../src/contexts/ThemeContext';

import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../src/config/FirebaseConfig';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient

type Props = StackScreenProps<SignInUpStackParamList, "ForgetPassword">;

const ForgetPassword = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // handle onPress for password update
  const handleUpdatePassword = async () => {
    console.log("Updated Password pressed");
    if (!email) {
      Alert.alert("Password cannot be empty.\nPlease enter your password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert("Password reset email sent!", "Please check your inbox.");
      navigation.navigate('SignIn');
    } catch (error: any) {
      console.log("Forget password:" + error);
      if (error.code === 'auth/invalid-email') {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    console.log("Sign In pressed");
    navigation.navigate('SignIn');
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
                  style={styles.input}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
                />
              </View>

              {/* Send reset password link */}
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUpdatePassword}
                >
                  <Text style={styles.buttonText}>Send reset password link to your email.</Text>
                </TouchableOpacity>
              )}

              {/* Already have an account */}
              <View style={styles.tipsText}>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text style={[styles.tips, { color: theme === 'dark' ? '#fff' : '#FF2EAB' }]}>
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

export default ForgetPassword;
