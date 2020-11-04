import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import styles from './styles';
import image from '../../assets/bg.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  function navigateToSignUp() {
    navigation.navigate('SignUp');
  }

  async function login() {
    try {
      await api.post('authenticate', { email, senha }).then((response) => {
        console.log(response.status);
      });
    } catch (error) {
      console.log(error);
    }
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
              value={email}
              multiline={false}
              textContentType="emailAddress"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Senha"
              autoCorrect={false}
              value={senha}
              multiline={false}
              textContentType="password"
              secureTextEntry
              onChangeText={(text) => setSenha(text)}
            />
            <TouchableOpacity style={styles.buttonLogin} onPress={login}>
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
