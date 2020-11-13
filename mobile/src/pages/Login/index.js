import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import styles from './styles';
import image from '../../assets/bg.jpeg';
import { login } from '../../services/authentication';

export default function Login() {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function navigateToSignUp() {
    navigation.navigate('SignUp');
  }

  async function handleSubmit() {
    try {
      if (!email || !password) {
        let text = '';
        if (!email) {
          text = `${text} - E-mail \n`;
        }
        if (!password) {
          text = `${text} - Senha`;
        }

        Alert.alert('Preencher campos necessários.', text);
        return;
      }

      setloading(true);
      await api
        .post('authenticate', { email, password })
        .then(async (response) => {
          if (response.status === 200) {
            await login(
              response.data.token,
              JSON.stringify(response.data.user)
            );
            navigation.navigate('Chat');
          }
        })
        .catch((error) => {
          if (error.response) {
            Alert.alert(error.response.data.error);
          }
        })
        .finally(() => setloading(false));
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
              value={password}
              multiline={false}
              textContentType="password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.buttonLogin} onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="#000f43" />
              ) : (
                  <Text style={styles.buttonLoginText}>Entrar</Text>
                )}
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
