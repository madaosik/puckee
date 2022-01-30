/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: 'home',
      Login: 'login',
      Signup: 'signup',
      ForgotPassword: 'forgotPassword',
      Root: {
        screens: {
          Games: {
            screens: {
              GamesList: 'games list',
              GameDetailsOverview: 'game details overview',
              GameDetailsTeams: 'game details teams',
              GameDetailsChat: 'game details chat',
              GameDetailsMap: 'game details map',
            }
          },
          IceRinks: {
            screens: {
              IceRinksScreen: 'ice rinks',
            },
          },
          Messages: {
            screens: {
              MessagesScreen: 'messages',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
          Notifications: {
            screens: {
              NotificationsScreen: 'notifications',
            },
          },
        },
      },
      Filter: 'filter',
      NotFound: '*',
    },
  },
};

export default linking;
