import React, { memo } from 'react';
import Background from '../../components/auth/Background';
import Logo from '../../components/auth/Logo';
import Header from '../../components/auth/Header';
import Paragraph from '../../components/auth/Paragraph';
import Button from '../../components/auth/Button';
import { AuthNavigation } from '../../types/navigation';

type Props = {
  navigation: AuthNavigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);