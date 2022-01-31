import React, { memo, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Header, Background, Button, TextInput } from '../../components/auth';
import { theme } from '../../utils/theme';
import { NavProps } from '.';
import { emailValidator, passwordValidator, storeToken } from '../../utils/auth';
import { useAppSelector, useAppDispatch } from 'puckee-common/redux';
import { login } from 'puckee-common/features/auth';
import { Credentials } from 'puckee-common/types';
import { unwrapResult } from '@reduxjs/toolkit'

const LoginScreen = ({ navigation }: NavProps) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const dispatch = useAppDispatch();
  const {token, status} = useAppSelector((state) => state.auth)

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const cred: Credentials = {email: email.value, password: password.value}
    dispatch(login(cred))
        .then(unwrapResult)
        .catch(e => console.error('Unable to unwrap the response: ' + e))
        .then(response => storeToken(response.access_token))
        .finally(() => console.log('Successfully logged in!'))
  };
  
  useEffect(() => {
    if (status == 'succeeded' && token) {
      navigation.navigate('LoggedIn')
    }
  })

  return (
    <Background>
      <Header>Let's play!</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        autoComplete="password"
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);