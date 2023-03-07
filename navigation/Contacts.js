import {
  Image,
  Text,
  View,
}from 'react-native';
  
import React, { useState, useEffect  } from 'react';
import LogoutButton from "../components/LogOutButton"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactList from '../components/ContactList';
import AddContactButton from '../components/addContactButton';
import { defaultPp } from '../Images.js'



export default function ContactScreen() {
  const [ppImageUrl, setPpImageUrl] = useState(defaultPp);
  console.log(ppImageUrl)

  useEffect(() => {

    const fetchUsrPp = async () => {
      const userId = await AsyncStorage.getItem("WhatsThat_usr_id")
        try {
          console.log(`Attempting to fetch profile picture for user: ${userId}`)
          const response = await fetch(`http://localhost:3333/api/1.0.0/user/${userId}/photo`, {
            method:"GET",
            headers:{
              "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
            }
          });
          if (response.status === 200){
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setPpImageUrl(objectUrl);
          } 
        } catch (error) {
          console.error(error);
        }
    }

    fetchUsrPp();
    console.log(ppImageUrl)
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LogoutButton/>
      <AddContactButton />
      <ContactList url='http://localhost:3333/api/1.0.0/contacts' fromContacts='true' />
    </View>
  );
}
