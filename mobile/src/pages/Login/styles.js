import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#737380',
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: '#000f43',
    flex: 1,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
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
  footer: {},
});
