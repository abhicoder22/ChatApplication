import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = props => {
  const {name, click} = props;
  return (
    <TouchableOpacity style={styles.button} onPress={click}>
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '40%',
    height: 50,
    backgroundColor: 'skyblue',
    marginTop: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Button;
