import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default function SignUp() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
}
