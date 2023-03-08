import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutButton() {
  return (
    <TouchableOpacity onPress={logout}>
      <Image
        style={styles.image}
        source={require('../assets/logout.png')}
      />
    </TouchableOpacity>
  )
}

const logout = async () => {
    return fetch("http://localhost:3333/api/1.0.0/logout", {
        method: "POST",
        headers:{
            "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
        }
    })
    .then(async (response) => {
        if(response.status === 200){
            await AsyncStorage.removeItem("WhatsThat_usr_token")
            await AsyncStorage.removeItem("WhatsThat_usr_id")
        } else if (response.status === 401) {
            console.log("Unauthorized")
            await AsyncStorage.removeItem("WhatsThat_usr_token")
            await AsyncStorage.removeItem("WhatsThat_usr_id")
        } else {
            throw "Something went wrong"
        }
        navigation.navigate('Root', { screen:'Welcome' })
    })
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
  },
})