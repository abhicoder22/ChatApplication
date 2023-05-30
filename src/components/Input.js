import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Input = props => {
  const {title, data, changeText} = props;
  return (
    <TextInput
      style={styles.textInput}
      placeholder={title}
      value={data}
      onChangeText={changeText}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});

export default Input;
