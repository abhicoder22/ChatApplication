import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {firebase} from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoggedinUser();
  }, []);

  const checkLoggedinUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      navigation.navigate('Chat');
    }
  };

  const handleSignIn = async () => {
    try {
      if (email.trim() === '' && password.trim() === '') {
        console.log('Please fill the details');
        return;
      } else if (email.trim() === '') {
        console.log('Email is required');
        return;
      } else if (password.trim() === '') {
        console.log('Password is required');
        return;
      }

      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('Logged in', response.user.email);
      const myId = response.user.uid;
      const userId = firebase.auth().currentUser.uid;
      await AsyncStorage.setItem('userToken', myId);
      await AsyncStorage.setItem('userIdd', userId);

      navigation.navigate('Chat', {
        myId,
        userId,
      });

      console.log(myId);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Email is already in use');
      }
      if (error.code === 'auth/invalid-email') {
        console.log('Email address is invalid');
      }
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 35, fontWeight: 'bold', alignSelf: 'center'}}>
        Login
      </Text>
      <View style={styles.viewStyle}>
        <Input title="email" data={email} changeText={text => setEmail(text)} />
        <Input
          title="password"
          data={password}
          changeText={text => setPassword(text)}
        />
        <Button name="Login" click={handleSignIn} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'skyblue',
              height: 30,
              width: 70,
              marginLeft: 5,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '40%',
    height: 50,
    backgroundColor: 'skyblue',
    marginTop: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
