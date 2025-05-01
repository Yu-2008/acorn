import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {SignInUpstyles as styles} from '../Styles';
import type { StackScreenProps } from '@react-navigation/stack';
import { SignInUpStackParamList } from "../Types";


type Props = StackScreenProps<SignInUpStackParamList, "SignUp">

const SignUp = ({route, navigation}: Props) => {
  console.log("Go into Sign Up screen")

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        
        <View style ={styles.formContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={() => {
                                              console.log("Sign Up Successful");
                                              navigation.navigate("SignIn");
                                              }}>
            <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.tipsText}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => 
                                            navigation.navigate("SignIn")}>
                <Text style={styles.tips}>Sign In</Text>
            </TouchableOpacity>
            </View>
        </View>

        
      </View>
    </SafeAreaView>
  );
};



export default SignUp;