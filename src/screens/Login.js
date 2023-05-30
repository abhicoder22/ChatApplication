import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import {firebase} from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(email => {
        console.log('logged in', email.user);
        navigation.navigate('Chat');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('email is already in use');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('email address is invalid!');

          console.log(error);
        }
      });
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
