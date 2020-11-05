import React from 'react';
import { Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

import Styles from './styles';

export default function Button({ loading, execute, title }) {
  return (
    <TouchableOpacity style={Styles.button} onPress={execute}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
          <Text style={Styles.textButton}>{title}</Text>
        )}
    </TouchableOpacity>
  );
}
