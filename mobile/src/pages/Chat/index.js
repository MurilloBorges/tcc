import React, { useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { getToken, getUser } from '../../services/authentication';

import styles from './styles';

export default function Chat() {
  useEffect(() => {
    async function getStorage() {
      const token = await getToken();
      const user = JSON.parse(await getUser()) || null;
      console.log(token, user);
    }

    getStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Psicólogo online</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
}
