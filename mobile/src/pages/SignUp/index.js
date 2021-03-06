import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import image from '../../assets/bg.jpeg';

export default function SignUp() {
  const navigation = useNavigation();

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Psicólogo online</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.login}>
            <TextInput
              style={styles.textInput}
              placeholder="Nome"
              autoCorrect={false}
              multiline={false}
              textContentType="username"
              keyboardType="default"
              onChangeText={() => { }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              autoCorrect={false}
              multiline={false}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={() => { }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Celular"
              autoCorrect={false}
              multiline={false}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              onChangeText={() => { }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              autoCorrect={false}
              multiline={false}
              secureTextEntry
              textContentType="newPassword"
              onChangeText={() => { }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Confirmar senha"
              autoCorrect={false}
              multiline={false}
              secureTextEntry
              textContentType="newPassword"
              onChangeText={() => { }}
            />
            <TouchableOpacity style={styles.buttonLogin} onPress={() => { }}>
              <Text style={styles.buttonLoginText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={navigateToLogin}
          >
            <Text style={styles.buttonSignUpText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
