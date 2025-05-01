import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { SignInStyles as styles } from '../Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';
import type { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";

type Props = StackScreenProps<SignInUpStackParamList, "SignIn"> & {
  onSignIn: () => void;
};

const SignIn = ({ navigation, onSignIn }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  {/**handle onPress */}
  const handleSignIn =()=>{
    console.log('Sign In pressed');
    onSignIn();
  }
  const handleSignUp =()=>{
    console.log('Sign Up pressed');
    navigation.navigate("SignUp");

  }
  const handleForgetPassword =()=>{
    console.log('Forget Password pressed');
    navigation.navigate('ForgetPassword')

  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#333' : '#FDE6F6' }, 
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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
            Welcome Back!
          </Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Email/Username</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={20}
                color="#f57cbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]} 
                placeholder="Enter your Email/Username here"
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
              <Icon
                name="lock-outline"
                size={20}
                color="#f57cbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]} 
                placeholder="Enter password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#f57cbb"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <View style={styles.forgotRow}>
              <TouchableOpacity onPress={handleForgetPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            {/* Bottom Text */}
            <View style={styles.tipsText}>
              <Text style={styles.grayText}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.registerLink}> Sign Up Here </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
