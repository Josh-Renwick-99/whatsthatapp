import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LogoutButton from '../components/LogOutButton';
import ContactList from '../components/ContactList';
import AddContactButton from '../components/addContactButton';
import ViewBlockedList from '../components/viewBlockedListButton';

const ContactScreen = () => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <LogoutButton />
        <AddContactButton />
        <ViewBlockedList />
      </View>
      <ContactList
        url="http://localhost:3333/api/1.0.0/contacts"
        fromContacts
      />
    </View>
  );
};

export default ContactScreen;
