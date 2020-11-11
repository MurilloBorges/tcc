import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = '@Tcc:token';
export const USER_KEY = '@Tcc:user';
export const isAuthenticated = () => AsyncStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const getUser = () => AsyncStorage.getItem(USER_KEY);
export const login = (token, user) =>
  AsyncStorage.multiSet([TOKEN_KEY, token], [USER_KEY, user]);
export const logout = () => AsyncStorage.removeItem(TOKEN_KEY);
