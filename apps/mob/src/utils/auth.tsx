import * as SecureStore from 'expo-secure-store';

type Token = string | null | void;

export const storeToken = async (token: string) => {
  await SecureStore.setItemAsync('secure_token', token)
    .catch(e => console.error("Could not save secure access token: " + e));
};

export const fetchToken = async () : Promise<Token> => {
  return SecureStore.getItemAsync('secure_token')
      .catch(e => console.error("Could not retrieve secure access token: " + e));
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync('secure_token')
}

export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  };

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};