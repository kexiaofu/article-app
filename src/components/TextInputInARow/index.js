import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';

function TextInputInARow({
  wrapperStyle,
  inputStyle,
  buttonStyle,
  changeHandler,
  placeholder,
  buttonText,
  okEvent,
}) {
  const [value, setValue] = useState('');
  const changeEvent = text => {
    setValue(text);
    typeof changeHandler === 'function' && changeHandler(text);
  };
  return (
    <View style={{...styles.wrapper, ...(wrapperStyle || {})}}>
      <TextInput
        style={{...styles.inputItem, ...(inputStyle || {})}}
        value={value}
        onChangeText={changeEvent}
        placeholder={placeholder}
      />
      <TouchableWithoutFeedback onPress={okEvent}>
        <Text style={{...styles.button, ...(buttonStyle || {})}}>
          {buttonText}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  inputItem: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    borderLeftWidth: 0.5,
    borderLeftColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});

export default TextInputInARow;
