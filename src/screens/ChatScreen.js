import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import logoutIcon from '../Assets/logout.png';
import msgIcon from '../Assets/chat.png';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  console.log('myiddd', route.params);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Image style={{height: 30, width: 30}} source={logoutIcon} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Image
          style={{height: 30, width: 30, marginRight: 10}}
          source={msgIcon}
        />
      ),
    });
  });

  useEffect(() => {
    const querySnapshot = firestore()
      .collection('chats')
      .doc('123456')
      .collection('messages')
      .orderBy('createdAt', 'desc');

    querySnapshot.onSnapshot(snapshot => {
      const allMessages = snapshot.docs.map(snap => {
        return {...snap.data(), createdAt: new Date()};
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = messagesList => {
    console.log(messagesList);
    const message = messagesList[0];
    const myMessage = {
      ...message,
      senderId: route.params.myId,
      receiverId: route.params.userId,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messagesList),
    );
    firestore()
      .collection('chats')
      .doc('123456')
      .collection('messages')
      .add({
        ...myMessage,
        createdAt: new Date(),
      });
  };

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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.myId,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: 'gray',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatScreen;
