import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";


type Props = StackScreenProps<SignInUpStackParamList, "SignIn"> & {
  onSignIn: () => void;
};

const SignIn = ({ navigation, onSignIn }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          {/* Logo + App Name */}
          <View style={styles.logoContainer}>
            <Image source={require('../img/logo.jpg')} style={styles.logo} />
          </View>

          <Text style={styles.title}>Welcome Back!</Text>
          <View style={styles.formContainer}>
            {/* Email */}
            <Text style={styles.label}>Email Or User Name</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={20}
                color="#f57cbb"
                style={styles.inputIcon}
              />
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
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="lock-outline"
                size={20}
                color="#f57cbb"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
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

            {/* Forgot Password and Remember Me */}
            <View style={styles.forgotRow}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('Sign In pressed');
                onSignIn();
              }}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            {/* Bottom Text */}
            <View style={styles.tipsText}>
              <Text style={styles.grayText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.registerLink}> Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E8DD',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 30,
    borderRadius: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8ACCD5',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 5,
    left:240,
  },
  forgotText: {
    color: '#f57cbb',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#789DBC',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipsText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerLink: {
    color: '#f57cbb',
    marginLeft: 4,
    fontWeight: '600',
  },
  grayText: {
    color: '#555',
  },
});
