import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from '../Types';
import { useTheme } from '../ThemeContext';
import { SignUpStyles as styles } from '../Styles';

type Props = StackScreenProps<SignInUpStackParamList, "SignUp">;

const SignUp = ({ route, navigation }: Props) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  {/**handle onPress */}
  const handleSignUp = () => {
    console.log("Sign Up pressed");
    navigation.navigate("SignIn");
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
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

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
