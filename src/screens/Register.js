import React, {createRef, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {firebase} from '@react-native-firebase/auth';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConpassword] = useState('');

  const handleSignUp = () => {
    if (
      name.trim() === '' &&
      email.trim() === '' &&
      password.trim() === '' &&
      conPassword.trim() === ''
    ) {
      console.log('Please fill the details');
      return;
    } else if (name.trim() === '') {
      console.log('name can not be empty');
      return;
    } else if (email.trim() === '') {
      console.log('email can not be empty');
      return;
    } else if (password.trim() === '') {
      console.log('password can not be empty');
      return;
    } else if (conPassword.trim() === '') {
      console.log('conpassword can not be empty');
      return;
    }

    if (password !== conPassword) {
      console.log('password and confirm pass is not same');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(email => {
        console.log('Signed up', email.user);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Signup error', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 35, fontWeight: 'bold', alignSelf: 'center'}}>
        Register
      </Text>
      <View style={styles.viewStyle}>
        <Input title="Name" data={name} changeText={text => setName(text)} />
        <Input title="Email" data={email} changeText={text => setEmail(text)} />
        <Input
          title="Password"
          data={password}
          changeText={text => setPassword(text)}
        />
        <Input
          title="Confirm password"
          data={conPassword}
          changeText={text => setConpassword(text)}
        />
        <Button name="Register" click={handleSignUp} />
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
});

export default RegisterScreen;
