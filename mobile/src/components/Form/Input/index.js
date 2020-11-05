import React, { useState } from 'react';
import { TextInput } from 'react-native';

import Styles from './styles';

export default function Input({
  placeholder,
  autoCapitalize,
  defaultValue,
  keyboardType,
  executeFunction,
  placeholderTextColor,
  secureTextEntry,
  maxLength,
}) {
  const [value, setvalue] = useState(defaultValue);

  function onChange(value, changeExecute) {
    setvalue(value);
    changeExecute(value);
  }

  return (
    <TextInput
      style={Styles.input}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      defaultValue={value}
      keyboardType={keyboardType}
      onChangeText={(text) => onChange(text, executeFunction)}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      maxLength={maxLength}
    />
  );
}
