import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from '../src/types/Types';
import { useTheme } from '../src/contexts/ThemeContext';
import { SignUpStyles as styles } from '../src/styles/Styles';
import { FIREBASE_AUTH } from '../src/config/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { insertUser } from '../src/database/database';
import LinearGradient from 'react-native-linear-gradient'; 
import { validateEmail } from '../src/services/emailValiadtion';

type Props = StackScreenProps<SignInUpStackParamList, "SignUp">;

const SignUp = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  // handle onPress
  const handleSignUp = async () => {
    console.log('Sign Up pressed');
    setLoading(true);

    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Sign up failed", "Please fill in email, username, password, confirm passord.");
      setLoading(false);
      return;
    }

    if (username.trim().length > 30) {
      Alert.alert("Sign up failed", "Username must not exceed 30 characters.");
      setLoading(false);
      return;
    }

  
    const isValid = await validateEmail(email);
    if (!isValid) {
      Alert.alert("Sign up failed", "Email are invalied.\nPlease enter a valid email address.\n(E.g. gmail).");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Sign up failed", "Confirm password are not match with password.\nPlease double check your password.");
      setConfirmPassword("");
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
      Alert.alert("Sign Up successful.", "Auto sign in for you.\nKindly enjoy our app.");
    } catch (error: any) {
      console.log("Sign up error:", error);
      let message = `Something went wrong. Please try again.\n${error.message}.`;

      if (error.code === 'auth/email-already-in-use') {
        message = "This email is already registered.\nPlease try signing in or use a different email.";
      } else if (error.code === 'auth/weak-password') {
        message = "Weak password. Password must be at least 6 characters.";
      }

      Alert.alert("Sign Up failed: " , message);
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
              <Text style={{color: theme === 'dark' ? '#fff' : '#000',fontStyle:'italic'}}>*The username is not editable once sign up. Please consider carefully.</Text>

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
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
                />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#f57cbb" />
              </TouchableOpacity>
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
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor={theme === 'dark' ? '#aaa' : '#aaa'}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#f57cbb" />
                </TouchableOpacity>
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
