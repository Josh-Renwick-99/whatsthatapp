import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';
import PhoneContact from './PhoneContact';
import AddContactButton from './addContactButton'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactList = ({ url, fromContacts }) => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers:{
            "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
        }
    });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeContact = async (id) => {
    console.log("Attempting to delete contact")
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, { 
        method: 'DELETE',
        headers:{
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
      } 
      });
      if (response.status === 200) {
        fetchData();
      } else {
        console.log('Error', 'Failed to remove contact.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addContact = async (id) => {
    console.log("Attempting to add contact")
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, { 
        method: 'POST',
        headers:{
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
      } 
      });
      if (response.status === 200) {
        fetchData();
      } else {
        console.log('Error', 'Failed to remove contact.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderContact = ({ item }) => {
    return <PhoneContact 
    user_id={item.user_id} 
    given_name={item.first_name} 
    family_name={item.last_name} 
    email={item.email} 
    fromContacts = {fromContacts}
    removeContact={() => removeContact(item.user_id)} 
    addContact = {() => addContact(item.user_id)}
    />;
  };

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={item => item.user_id.toString()}
      />
    </View>
  );
};

export default ContactList;
