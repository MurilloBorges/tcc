import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.login}>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            autoCorrect={false}
            onChangeText={() => { }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={() => { }}
          />
          <TouchableOpacity style={styles.buttonLogin} onPress={() => { }}>
            <Text style={styles.buttonLoginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer} />
    </View>
  );
}
