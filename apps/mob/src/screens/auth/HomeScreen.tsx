import React, { memo } from 'react';
import Background from '../../components/auth/Background';
import Logo from '../../components/auth/Logo';
import Header from '../../components/auth/Header';
import Button from '../../components/auth/Button';
import Paragraph from '../../components/auth/Paragraph';
import { AuthNavigation } from '../../types/navigation';

type Props = {
  navigation: AuthNavigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    {/* <Logo /> */}
    <Header>Hockeyee</Header>
    <Paragraph>
      Play whenever, with whomever and wherever you want!
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('Signup')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);