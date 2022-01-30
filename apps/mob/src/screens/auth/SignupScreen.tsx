import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  { Background, Header, Button, TextInput, RoleMultipleSelect, LevelSlider } from '../../components/auth'
import { theme } from '../../utils/theme';
import { NavProps } from '.';
import { emailValidator, passwordValidator, nameValidator } from '../../utils/auth';
import { SignUpController } from '../../controller/SignUpController';
import { Item } from 'react-native-multi-selectbox-typescript';
import PerformanceLevelPucks from '../../components/main/PerformanceLevelPucks';

const SignupScreen = ({ navigation }: NavProps) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [perfLevel, setPerfLevel] = useState(0)
  const [selectedRoles, setSelectedRoles] = useState<Item[]>([]);

  const controller = new SignUpController()

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    var resRoles: number[] = selectedRoles.map(r => r.id)
    controller.signUp({name: name.value, email: email.value, password: password.value, 
                      roles: resRoles, perfLevel: perfLevel})
    navigation.navigate('Login');
  };

  const onPerfLevelSliderChange = (val: number) => { setPerfLevel(val) }
  const updateRoles = (items: Item[]) => { setSelectedRoles(items) }

  const performanceLevelDesc = (): string => {
    if (perfLevel == 0) {
      return "Estimate your skill level from 1 to 6:"
    } else if (perfLevel == 1) {
      return "Very low - absolute rookie"
    } else if (perfLevel == 2)  {
      return "Low - only a few games played"
    } else if (perfLevel == 3) {
      return "Mediocre"
    } else if (perfLevel == 4) {
      return "Above average"
    } else if (perfLevel == 5) {
      return "Very good among amateur players"
    } else if (perfLevel == 6) {
      return "Exceptional for amateur hockey"
    }
  }

  return (
    <Background>
      {/* <Logo /> */}
      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        autoComplete="name"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

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
      <RoleMultipleSelect updateParentRoles={updateRoles}/>
      <View style={styles.row}>
        <Text style={styles.performanceDesc}>{performanceLevelDesc()}</Text>
      </View>
      <PerformanceLevelPucks puckSize={50} perfLevel={perfLevel} iconKey="signup" style={styles.puckField}/>
      <LevelSlider onValueChange={onPerfLevelSliderChange} minValue={0}/>
      
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  performanceDesc: {
    marginTop: 30,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  puckField: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
});

export default memo(SignupScreen);