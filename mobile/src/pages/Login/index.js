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

export default function Login() {
  const navigation = useNavigation();

  function navigateToSignUp() {
    navigation.navigate('SignUp');
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
            <TouchableOpacity
              style={styles.buttonRecuperarSenha}
              onPress={() => { }}
            >
              <Text style={styles.buttonRecuperarSenhaText}>
                Não sei minha senha
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={navigateToSignUp}
          >
            <Text style={styles.buttonSignUpText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
