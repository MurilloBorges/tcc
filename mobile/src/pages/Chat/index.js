import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default function Chat() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Psicólogo online</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
}
