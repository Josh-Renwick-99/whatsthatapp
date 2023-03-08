import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ user_id, given_name, family_name, email, styling, fromContacts, removeContact, addContact }) => {
    const defaultPp = require('../assets/defaultpp.png')
    const [ppImageUrl, setPpImageUrl] = useState(defaultPp);
    console.log(ppImageUrl)
  
    useEffect(() => {
  
      const fetchUsrPp = async () => {
          try {
            console.log(`Attempting to fetch profile picture for user: ${user_id}`)
            const response = await fetch(`http://localhost:3333/api/1.0.0/user/${user_id}/photo`, {
              method:"GET",
              headers:{
                "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
              }
            });
            if (response.status === 200){
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setPpImageUrl(objectUrl);
            } else {
                setPpImageUrl(defaultPp);
            }
          } catch (error) {
            console.error(error);
            setPpImageUrl(defaultPp);
          }
      }
  
      fetchUsrPp();
      console.log(ppImageUrl)
    }, []);

    return(
        <View>
            <View style={styles.imageContainer}>
                <Image source={{uri: ppImageUrl}} style={styles.image} />
            </View>
            <Text style={styles.name}>{given_name} {family_name}</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
}   

const styles = {
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // black text color
        marginBottom: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      email: {
        fontSize: 14,
        color: '#B3B3B3', // light gray text color
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      image:{
        width: 100, 
        height: 100,
      }, 
      imageContainer:{
        alignItems: 'center', 
        justifyContent: 'flex-start',
      }
}

export default Profile;