import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
      console.log('Logout successfully');
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  return (
    <View>
      <Text>ChatScreen</Text>
      <TouchableOpacity
        style={{
          height: 30,
          width: '80%',
          backgroundColor: 'skyblue',
          alignSelf: 'center',
        }}
        onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreen;
