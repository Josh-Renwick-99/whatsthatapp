import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { validate } from 'react-email-validator';
import PassMeter from "react-native-passmeter";
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import { theme } from '../core/theme'
import { SafeAreaView } from 'react-native-web';


export default function RegisterScreen({ navigation }) {
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [surname, setSurname] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: ''})
    const [isDisabled, setDisabled] = useState(false)

    const styles = {
        inputView: {
            backgroundColor: "#FFC0CB",
            borderRadius: 30,
            width: "70%",
            marginTop: 40,
            alignItems: "center",
        },
        TextInput: {
            paddingBottom:10,
            paddingTop: 10,
            marginBottom: 10,
            color:'black',
            textAlign:'center',
            placeholderTextColor:'black',
            backgroundColor:'white',
            borderRadius: 25,
            borderWidth: 2,
            width: '75%',
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
        loginBtn:{
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
            textAlign: "center",
        },
        container: { 
            flex: 1, 
            justifyContent: "center",
            width: 50,
         },
    };

    const onSignUpPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = validatePassword(password.value)
        if (emailError || passwordError) {
          setEmail({ ...email, error: emailError })
          setPassword({ ...password, error: passwordError })
          return
        }
        setDisabled(true);

        
          const postUser = async () => {

            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  first_name: firstName.value,
                  last_name: surname.value,
                  email: email.value,
                  password: password.value})
            };
            
            console.log(requestOptions);

            await fetch(
                'http://localhost:3333/api/1.0.0/user', requestOptions)
                .then(async (response) => {
                    if (response.status === 201){
                      return response.json();
                    } else if (response.status === 400){
                      throw "Email address is already in use"
                    } else {
                      throw "Something went wrong"
                    }
          })
          .then((responseJson) => {
            console.log(responseJson);
            setEmail({...email, error: "User added successfully"});
            setDisabled(false);
            onBackPressed();
          })
          .catch((e) => {
            console.log(error)
            setEmail({...email, error: e})
            setDisabled(false)
          })
        }
        postUser();
      }

        const onBackPressed = () => {
            navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
        })
    }

  return (
    <Background>
    <BackButton goBack={onBackPressed} />
        <Logo />
        <Header>Create Account</Header>
        <TextInput
            label="FirstName"
            placeholder='First Name:'
            style = {styles.TextInput}
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setFirstName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
        />
        <TextInput
            label="Surname"
            placeholder='Surname:'
            style = {styles.TextInput}
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setSurname({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
        />
        <TextInput
            label="Email"
            placeholder='Email Address:'
            returnKeyType="next"
            style = {styles.TextInput}
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
        />
        {email.error ? <Text style={{ color: 'red', paddingBottom: 6 }}>{email.error}</Text> : null}
        <TextInput
            label="Password"
            placeholder='Password'
            style = {styles.TextInput}
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
        />
        {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}
        <Button
            mode="contained"
            disabled={isDisabled}
            onPress={onSignUpPressed}
            style={styles.button}      >
            Sign Up
        </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={onBackPressed}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

function emailValidator(email) {
    if (!email) return "Email can't be empty."
    if (!validate(email)) return 'Ooops! We need a valid email address.'
    return ''
  }

function validatePassword(password) {
  if (!/^.{8,16}$/.test(password)) {
    return 'Password must be between 8 and 16 characters long';
  }
  if (!/[!@#$%^&*()-_+=\[\]{}|\\:;"'<>,.?/]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit';
  }
  if (!/[A-Z]/.test(password)) {
    return 'password must contain at least one uppercase letter';
  }
  return ''
}

