import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    height: 1,
    marginTop: Constants.statusBarHeight + 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: '#000f43',
    flex: 1,
    marginHorizontal: 24,
    marginTop: 60,
    borderRadius: 24,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textInput: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    color: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 2,
    margin: 10,
    fontSize: 20,
  },
  buttonLogin: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 12,
    margin: 10,
    borderRadius: 12,
  },
  buttonLoginText: {
    color: '#000f43',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonRecuperarSenha: {
    marginTop: 12,
    alignItems: 'center',
  },
  buttonRecuperarSenhaText: {
    color: '#ffffff',
    fontSize: 14,
  },
  footer: {
    marginTop: 12,
    marginBottom: 12,
  },
  buttonSignUp: {
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 36,
  },
  buttonSignUpText: {
    color: '#ffffff',
    fontSize: 24,
  },
});
