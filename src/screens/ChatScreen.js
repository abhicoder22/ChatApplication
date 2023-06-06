import React, {useCallback, useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import logoutIcon from '../Assets/logout.png';
import attachIcon from '../Assets/attach.png';
import msgIcon from '../Assets/chat.png';
import sendIcon from '../Assets/send.png';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import BottomSheet from '../components/BottomSheet';

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);
  const [myId, setMyId] = useState('');
  const [userId, setUserId] = useState('');
  const route = useRoute();
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelected = imageUri => {
    console.log('profile image', imageUri);

    setSelectedImage(imageUri);
    selectedPhoto(imageUri);
    setDialogVisible(false);
  };

  const handleProfileImage = () => {
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        {cancelable: false},
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getMyId = async () => {
      const myId = await AsyncStorage.getItem('userToken');
      setMyId(myId);
    };

    getMyId();
  }, []);

  useEffect(() => {
    const getMyUserId = async () => {
      const userId = await AsyncStorage.getItem('userIdd');
      setUserId(userId);
    };

    getMyUserId();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{}}>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              style={{height: 30, width: 30, marginRight: 8}}
              source={logoutIcon}
            />
          </TouchableOpacity>
        </View>
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
      senderId: myId,
      receiverId: userId,
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
          _id: myId,
        }}
        renderSend={props => {
          return (
            <View
              style={{alignItems: 'center', height: 50, flexDirection: 'row'}}>
              <TouchableOpacity onPress={handleProfileImage}>
                <Image
                  style={{height: 30, width: 30, marginRight: 10}}
                  source={attachIcon}
                />
              </TouchableOpacity>
              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <View
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                    backgroundColor: '#2d93f4',
                    paddingStart: 4,
                  }}>
                  <Image
                    style={{height: 22, width: 22, tintColor: 'white'}}
                    source={sendIcon}
                  />
                </View>
              </Send>
            </View>
          );
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

      <BottomSheet
        visible={isDialogVisible}
        onClose={handleCloseDialog}
        onImageSelected={handleImageSelected}
      />
    </View>
  );
};

export default ChatScreen;
