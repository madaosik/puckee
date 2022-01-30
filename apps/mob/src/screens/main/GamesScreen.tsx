import React, {  } from 'react'
import { StyleSheet } from 'react-native'

import { GameStackParamList, RootTabScreenProps } from '../../types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameDetailsOverview from '../../features/games/GameDetailsOverview';
import GameDetailsTeams from '../../features/games/GameDetailsTeams';
import GameDetailsChat from '../../features/games/GameDetailsChat';
import GameDetailsMap from '../../features/games/GameDetailsMap';
import { theme } from '../../utils/theme'
import GamesList from '../../features/games/GameList';


const Stack = createNativeStackNavigator<GameStackParamList>();

export default function GamesScreen({ navigation }: RootTabScreenProps<'Games'>) {
    return (
      <Stack.Navigator initialRouteName="GamesList" screenOptions={{headerShown: false}}>
        <Stack.Screen name="GamesList" component={GamesList} />
        <Stack.Screen name="GameDetailsOverview" component={GameDetailsOverview} />
        <Stack.Screen name="GameDetailsTeams" component={GameDetailsTeams} />
        <Stack.Screen name="GameDetailsChat" component={GameDetailsChat} />
        <Stack.Screen name="GameDetailsMap" component={GameDetailsMap} />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center"
  },
  column: {
    flexDirection: "column",
	  flex: 1,
  },
  filterReportView: {
    flexDirection: 'row',
    marginVertical: 10
  },
  filterReport: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1
  },
  separator: {
    height: 1,
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#000',
  },
  sectionHeader: {
    paddingLeft: 10,
    backgroundColor: "#dcdcdc",
    fontSize: 14,
    fontWeight: "bold"
  }
});
