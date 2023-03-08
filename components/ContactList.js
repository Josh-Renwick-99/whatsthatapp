import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, SectionList, ActivityIndicator, Text } from 'react-native';
import PhoneContact from './PhoneContact';
import AddContactButton from './addContactButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";

const ContactList = ({ url, fromContacts }) => {
  const [contacts, setContacts] = useState([]);
  const [blockedContacts, setBlockedContacts] = useState([]);
  const toast = useToast();
  useEffect(() => {
    fetchData();
    console.log("Successfully fetched contact list")
  }, [url]);

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        const groupedContacts = groupBy(data, item => {
          const lastName = item.last_name || item.family_name;
          return lastName ? lastName[0].toUpperCase() : '';
        });
        setContacts(groupedContacts);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch('http://localhost:3333/api/1.0.0/blocked', {
        method: "GET",
        headers: {
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
        }
      })
      .then(async (response) => {
        const data = await response.json()
        setBlockedContacts(data)
      }) 
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
        console.log("Successfully removed contact")
        toast.show("Contact removed!", toastProps)
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
        toast.show("Contact added!", toastProps)
        fetchData();
      } else {
        console.log('Error', 'Failed to remove contact.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const blockContact = async (id) => {

    console.log(`Attempting to block contact ${id}`)
    try {
      const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/block`, { 
        method: 'POST',
        headers:{
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
      } 
      });
      if (response.status === 200) {
        toast.show("Contact Blocked!", toastProps)
        fetchData();
      } else if (response.status === 400){
        console.log('Error', 'You cant block yourself.');
      } else {
        console.log('Error', 'Failed to block contact.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderContact = ({ item }) => {
    if (!item) {
      return null;
    }

    const { user_id, given_name, family_name, first_name, last_name, email } = item;

    return (
      <PhoneContact
        user_id={user_id}
        given_name={given_name || first_name}
        family_name={family_name || last_name}
        email={email}
        fromContacts={fromContacts}
        removeContact={() => removeContact(user_id)}
        addContact={() => addContact(user_id)}
        blockContact = {() => blockContact(user_id)}
        blockedContacts = {blockedContacts}
      />
    );
  };

  const renderSectionHeader = ({ section }) => {
    return <Text style={styles.sectionHeader}>{section.title}</Text>;
  };

  if (!Array.isArray(contacts) || contacts.length === 0) {
    console.log(contacts)
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={contacts}
        renderItem={renderContact}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.user_id.toString()}
        style={styles.sectionList}
      />
    </View>
  );
};

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map, ([title, data]) => ({ title, data }));
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    margin: 50,
    backgroundColor: "#fff",
  },
  sectionList: {
    height: '80%',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

const toastProps = {
  type: "successm",
  placement: "top",
  duration: 4000,
  offset: 30,
  animationType: "slide-in | zoom-in",
}

export default ContactList;
