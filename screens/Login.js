import React, { TouchableOpacity, TextInput, Text, View, useState } from 'react';

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
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn:
  {
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#FF1493",
  }
};

export default function LoginScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return(
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
      /> 

      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      /> 

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>
    </View>
  );
}
