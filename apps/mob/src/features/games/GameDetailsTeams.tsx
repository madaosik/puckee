import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import _ from 'lodash';

import { View, Text } from '../../components/main/Themed';
import { useAppSelector } from '../../redux/store';
import { IAthlete, IGame } from '../../types';
import { GameStackScreenProps } from '../../types/navigation';
import { GameDetailsNavigationBar } from './GameDetailsNavigationBar';
import { selectGameById } from './gamesSlice';

const viewLightColor = "#555"
const viewDarkColor = "#888"


function players(selectedPlayers: IAthlete[]) {
  const columns: JSX.Element[] = []
  const distanceProcessor = (index: number) => (50 - Math.abs(index) * 25 + 10) * 2

  for (let i = -2; i < 3; i++) {
    const player1 = selectedPlayers.pop()
    const player2 = selectedPlayers.pop()

    const playerColor1 = player1 === undefined ? "#CD212A" : "#00A170"
    const playerColor2 = player2 === undefined ? "#CD212A" : "#00A170"

    const column = (
      <View key={`players_${i}`} style={[styles.column, {backgroundColor: "transparent", alignItems: "center",}]}>
        <Text style={[styles.playerName, {textAlignVertical: "bottom"}]}>{player1?.name}</Text>
        <View style={[styles.player, { borderColor: playerColor1 }]} key={player1?.id}/>
        
        <View style={{ height: distanceProcessor(i), backgroundColor: "transparent" }}/>
        
        <View style={[styles.player, { borderColor: playerColor2 }]} key={player2?.id}/>
        <Text style={[styles.playerName, {textAlignVertical: "top"}]}>{player2?.name}</Text>
      </View>
    )
    columns.push(column)
    
  }
  return (
    <View style={[styles.playerBox, styles.row]}>
      {columns}
    </View>
  )
}

export default function GameDetailsTeams({route, navigation}: GameStackScreenProps<"GameDetailsTeams">) {
    const { gameId } = route.params;
    const game: IGame = useAppSelector(state => selectGameById(state, gameId)) as IGame

    const goalColor1 = game.goalies.length > 0 ? "#00A170" : "#CD212A"
    const goalColor2 = game.goalies.length > 1 ? "#00A170" : "#CD212A"
    const refereeColor = game.referees.length > 0 ? "#00A170" : "#CD212A"

    const selectedPlayers = _.sampleSize(game.players, 10)
    const selectedGoalies = _.sampleSize(game.goalies, 2)

    return (
        <View style={[styles.column]}>
            <GameDetailsNavigationBar onPressed={(path: any) => navigation.navigate(path, route.params)}/>
            <View style={[styles.field, styles.column, {justifyContent: "space-around"}]}>
              <View style={[styles.goal]}>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.line]}/>
                <View style={[styles.goalKeeper, {borderColor: goalColor1}]}></View>
                <Text style={{position: "absolute", top: 25}}>{selectedGoalies.pop()?.name}</Text>
              </View>
              
              <View style={[styles.middle]}>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.line]}/>
                <View style={[styles.circle]}>
                  <View style={[{height: 50, alignItems: "center"}]}>
                    <View style={[styles.row]}>
                      <MaterialCommunityIcons name='account-multiple-check' size={24} color="#BBB"/>
                      <Text style={{marginLeft: 5}}>{game.players.length}/{game.total_places}</Text>
                    </View>
                    <MaterialCommunityIcons name='whistle' size={24} color={refereeColor}/>
                  </View>
                </View>
                {players(selectedPlayers)}
              </View>
              
              <View  style={[styles.goal]}>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.line]}/>
                <View style={[styles.goalKeeper, {borderColor: goalColor2}]}></View>
                <Text style={{position: "absolute", bottom: 25}}>{selectedGoalies.pop()?.name}</Text>
              </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
      width: "95%",
      margin: 10,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: "#BBB",
      overflow: "hidden",
      flex: 1
    },
    goal: {
      width: "100%", 
      alignItems: "center", 
      justifyContent: "center"
    },
    middle: {
      width: "100%", 
      marginVertical: "50%",
      alignItems: "center", 
      justifyContent: "center"
    },
    circle: {
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 5,
      borderColor: "#BBB",
      alignItems: "center",
      justifyContent: "center",
    },
    playerBox: {
      position: "absolute",
      width: 350,
      backgroundColor: "rgba(0,0,0,0)",
      alignItems: "center",
      justifyContent: "center"
    },
    player: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: "#BBB",
    },
    playerName: {
      fontSize: 12, 
      height: 50, 
      width: 200, 
      textAlign: "center",
    },
    goalKeeper: {
      position: "absolute",
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: "#BBB",
    },
    row: {
      flexDirection: "row",
      flex: 1,
    },
    column: {
      flexDirection: "column",
        flex: 1,
    },
    line: {
      height: 1,
      width: '100%',
    },
  }); 