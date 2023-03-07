import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Button
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ROW_HEIGHT = 70;

const ListElement = ({ user_id, given_name, family_name, email, fromContactScreen }) => {
  const [buttonText, setButtonText] = useState(fromContactScreen ? 'Remove Contact' : 'Add Contact');
  
  const add = async (id) => {
    console.log(`Adding contact ${id}`)
    await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
      method: "POST",
      headers:{
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
      }
    });
    setButtonText('Remove Contact');
  };
  
  const remove = async (id) => {
    console.log(`Removing contact ${id}`)
    await fetch(`http://localhost:3333/api/1.0.0/user/${id}/contact`, {
      method: "DELETE",
      headers:{
          "X-Authorization": await AsyncStorage.getItem("WhatsThat_usr_token")
      }
    });
    setButtonText('Add Contact');
  };

  return (
    <TouchableOpacity>
      <Animated.View style={styles.row}>
        <View>
          <Text style={styles.name}>{given_name} {family_name}</Text>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity onPress={() => fromContactScreen ? remove(user_id) : add(user_id)}>
            <Text>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
    height: ROW_HEIGHT
  },
  name: {
    fontSize: 18,
    fontWeight: "500"
  },
  email: {
    fontSize: 14
  }
});

export default ListElement;
