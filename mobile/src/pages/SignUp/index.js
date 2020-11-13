import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import image from '../../assets/bg.jpeg';
import api from '../../services/api';
import { login } from '../../services/authentication';

export default function SignUp() {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function navigateToLogin() {
    navigation.navigate('Login');
  }

  async function handleSubmit() {
    try {
      if (!name || !email || !password || !confirmPassword) {
        let text = '';
        if (!name) {
          text = `${text} - Nome \n`;
        }
        if (!email) {
          text = `${text} - E-mail \n`;
        }
        if (!password) {
          text = `${text} - Senha \n`;
        }
        if (!confirmPassword) {
          text = `${text} - Confirmar senha`;
        }

        Alert.alert('Preencher campos necessários.', text);
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Confirmação da senha incorreta');
        return;
      }

      setloading(true);
      await api
        .post('users', { name, email, cellphone, password })
        .then(async (response) => {
          if (response.status === 201) {
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
        <KeyboardAwareScrollView>
          <View style={styles.main}>
            <View style={styles.login}>
              <TextInput
                style={styles.textInput}
                placeholder="Nome"
                value={name}
                autoCorrect={false}
                multiline={false}
                textContentType="username"
                keyboardType="default"
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="E-mail"
                value={email}
                autoCorrect={false}
                multiline={false}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Celular"
                value={cellphone}
                autoCorrect={false}
                multiline={false}
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
                onChangeText={(text) => setCellphone(text)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Senha"
                autoCorrect={false}
                value={password}
                multiline={false}
                secureTextEntry
                textContentType="newPassword"
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirmar senha"
                autoCorrect={false}
                multiline={false}
                value={confirmPassword}
                secureTextEntry
                textContentType="newPassword"
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={handleSubmit}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#000f43" />
                ) : (
                    <Text style={styles.buttonLoginText}>Cadastrar</Text>
                  )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={navigateToLogin}
          >
            <Text style={styles.buttonSignUpText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
