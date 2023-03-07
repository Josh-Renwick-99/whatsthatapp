import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import ListElement from "./ContactListOld";
  import AddContactButton from "./addContactButton"
  
  export default function Contact(props) {
    const [page, setPage] = useState(1);
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonUpdated, setButtonUpdated] = useState(false);
  
    useEffect(() => {
      fetchContacts();
    }, [buttonUpdated]);
  
    const fetchContacts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(props.url, {
          method: "GET",
          headers: {
            "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
          }
        });
        const newContacts = await response.json();
        if (newContacts && newContacts.length > 0) {
          setContacts([...contacts, ...newContacts]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleButtonUpdate = () => {
      setButtonUpdated(!buttonUpdated);
    };
  
    const handleRemoveContact = async (id) => {
      console.log(`Removing contact ${id}`);
      try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
          method: "DELETE",
          headers: {
            "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
          }
        });
        const removedContact = await response.json();
        setContacts(contacts.filter(contact => contact.user_id !== removedContact.user_id));
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleAddContact = async (id) => {
      console.log(`Adding contact ${id}`);
      try {
        const response = await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
          method: "POST",
          headers: {
            "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
          }
        });
        const addedContact = await response.json();
        setContacts([...contacts, addedContact]);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleEndReached = () => {
      setPage(page + 1);
      fetchContacts();
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <FlatList
            style={{ marginTop: 20 }}
            data={contacts}
            renderItem={({ item, index }) => (
              <ListElement
                {...item}
                index={index}
                fromContactScreen={props.fromContactScreen}
                onRemoveContact={handleRemoveContact}
                onAddContact={handleAddContact}
                onButtonUpdate={handleButtonUpdate}
              />
            )}
            keyExtractor={item => item.user_id + item.given_name + item.family_name + item.email}
            ListHeaderComponent={() => <AddContactButton />}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0}
          />
          {isLoading && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "row",
      alignSelf: "stretch"
    },
    list: {
      width: "100%"
    },
    activity: {
      alignSelf: "center"
    }
  });

  