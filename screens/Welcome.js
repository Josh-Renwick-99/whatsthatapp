import { TouchableOpacity, TextInput, Text, View } from 'react-native';
import { validate } from 'react-email-validator';
import React, { useState } from "react";
import Background from '../components/Background'
import Header from '../components/Header'
import { theme } from '../core/theme';
import Logo from '../components/Logo';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = {
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    paddingBottom:10,
    paddingTop: 10,
    marginBottom: 10,
    color:'black',
    textAlign:'center',
    placeholderTextColor:'black',
    textColor: 'black',
    backgroundColor:'white',
    borderRadius: 25,
    borderWidth: 2,
    width: '75a%',
    height: '5%',
    borderColor: theme.colors.button,
  },
  SignUp: {
    flexDirection: 'row',
    marginTop: 4,
    borderRadius: 25,
  },
  forgot_button: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.bold,
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor: theme.colors.Button,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.bold,
  },
};

export default function WelcomeScreen({ navigation }){
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isDisabled, setDisabled] = useState(false)

  const onLoginPressed = () => {
    setDisabled(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    };
    const postLogin = async () => {
        await fetch(
            'http://localhost:3333/api/1.0.0/login', requestOptions)
            .then(async (response) => {
              if (response.status === 200) {
                return response.json()
              } else if (response.status === 400){
                throw "Invalid login credentials"
              } else {
                throw "Something went wrong"
              }
            })
            .then(async (responseJson) => {
              console.log(responseJson)
              try {
                await AsyncStorage.setItem("WhatsThat_usr_id", responseJson.id)
                await AsyncStorage.setItem("WhatsThat_usr_token", responseJson.token)
                setDisabled(false)
              } catch {
                throw "Something went wrong"
              }
            })
    }
    postLogin();
  }

  return(
    <Background>
      <Header>Welcome to WhatsThat</Header>
      <Logo />
      <TextInput
        style = {styles.TextInput}
        label="Email"
        placeholder="Email:"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        style = {styles.TextInput}
        label="Password"
        placeholder="Password:"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgot_button}>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} disabled={isDisabled}>
        Login
      </Button>
      <View style={styles.SignUp}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

