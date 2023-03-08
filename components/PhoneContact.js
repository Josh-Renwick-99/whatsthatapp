import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import Profile from './Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneContact = ({user_id, given_name, family_name, email, removeContact, addContact, blockContact, fromContacts}) => {
  const buttonColor = fromContacts ? 'red' : 'green';
  const buttonText = fromContacts ? 'Remove Contact' : 'Add Contact';

  const handleButtonPress = () => {
    if (fromContacts) {
      removeContact({ user_id });
    } else {
      addContact({ user_id });
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>{given_name} {family_name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType='slide' onRequestClose={toggleModal}>
        <View style={[styles.modalContainer, {justifyContent: 'space-between'}]}>
          <Profile
            given_name={given_name}
            family_name={family_name}
            email={email}
            styling={styles}
          />
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => handleButtonPress()} style={[styles.button, {backgroundColor: buttonColor}]}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.button}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => blockContact()} style={[styles.button, {backgroundColor: 'gray'}]}>
                <Text style={styles.buttonText}>Block Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FFFFFF', // black background color
      borderWidth: 2,
      borderColor: 'green',
      padding:20,
    },
    modalContainer: {
      height: '35%',
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'green',
      margin: 20,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black', // black text color
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: '#B3B3B3', // light gray text color
    },
    buttonContainer:{
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 15,
    },
    button: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      width: '30%',
      borderWidth: 2,
      borderColor: 'green',
      alignItems: 'center',
    },
    buttonWrapper:{
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center' 
    },

  });

export default PhoneContact;

/*
          <View style={styles.buttonWrapper}>
            <View style={{padding: 10}}>
              <TouchableOpacity onPress={handleButtonPress}>
                <Text style={[styles.button, { color: buttonColor }]}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding:10}}>
              <TouchableOpacity onPress={handleButtonPress}>
                <Text style={[styles.button, { color: 'red' }]}>Block Contact</Text>
              </TouchableOpacity>
            </View>
          </View>
          */