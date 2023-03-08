import React, { useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Modal from "react-native-modal";
import ContactList from "./ContactList";

export default function ViewBlockedList() {
  const [isContactScreenVisible, setContactScreenVisible] = useState(false);

  const toggleAddContact = async () => {
    setContactScreenVisible(!isContactScreenVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAddContact}>
        <Image source={require('../assets/blockedList.png')} style={styles.modalImage} />
      </TouchableOpacity>
      <Modal isVisible={isContactScreenVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Block List</Text>
          <ContactList
           url="http://localhost:3333/api/1.0.0/blocked"
           />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={toggleAddContact}>
              <Text style={styles.primaryButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  modalContainer: {
    height: '75%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalImage: {
    width: 64,
    height: 64,
  },
  modalImageContainer:{
    flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' 
  },
  modalTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: '#1DB954',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  secondaryButtonText: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});
