/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GameDay } from './game';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// For the purposes of the authentication module
export type AuthNavigation = {
  navigate: (scene: string) => void;
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Filter: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Games: NavigatorScreenParams<GameStackParamList> | undefined;
  IceRinks: undefined;
  Messages: undefined;
  Profile: undefined;
  Notifications: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type GameStackParamList = {
  GamesList: undefined,
  GameDetailsOverview: { gameId: number }
  GameDetailsTeams: { gameId: number }
  GameDetailsChat: { gameId: number }
  GameDetailsMap: { gameId: number }
};

export type GameStackScreenProps<Screen extends keyof GameStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<GameStackParamList, Screen>,
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;
