import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PhoneContact = ({ user_id, first_name, last_name, email, removeContact, addContact, fromContacts }) => {
    const buttonColor = fromContacts ? 'red' : 'green';
    const buttonText = fromContacts ? 'Remove Contact' : 'Add Contact';
  
    const handleButtonPress = () => {
      if (fromContacts) {
        removeContact({ user_id });
      } else {
        addContact({ user_id });
      }
    };
  
    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>{first_name} {last_name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text style={[styles.button, { color: buttonColor }]}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#1D1D1D', // black background color
      borderBottomColor: '#282828', // darker gray border color
      borderBottomWidth: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF', // white text color
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: '#B3B3B3', // light gray text color
    },
    button: {
      color: '#1DB954', // green button color
    },
  });

export default PhoneContact;
