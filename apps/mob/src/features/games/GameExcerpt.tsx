import React from 'react';

import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Text, View } from '../../components/main/Themed';
import { IGame } from '../../types';
import PerformanceLevelPucks from '../../components/main/PerformanceLevelPucks';

export const GameExcerpt = (game: IGame) => {
    const level: any = [];
    const goalies: any = [];

    for(let i=0; i < 6; i++) {
      if(i < game.exp_level) {
        level.push(<MaterialCommunityIcons  name="hockey-puck" size={24} color="#000000" key={game.id + ":level " + i}/>);
      } else {
        level.push(<MaterialCommunityIcons  name="hockey-puck" size={24} color="#dcdcdc" key={game.id + ":level" + i}/>);
      }
    }

    if(game.goalies !== undefined) {
      game.goalies.forEach(g => 
        goalies.push(
          <MaterialCommunityIcons size={24} name="shield" key={g.id + "_shield"} color="#000"/>
        )
      )
    }

    return (
      <View style={[styles.container]}>
        <View style={[styles.column]}>
          <Text style={styles.name}>{game.name}</Text>

          <View style={[styles.row]}>

            <View style={[styles.column, {flex: 3}]}>
              <View style={[styles.row]}>
                <MaterialCommunityIcons size={24} name="clock" color="#000"/>
                <Text style={[styles.alignText]}>{format(Date.parse(game.start), "HH:mm")}</Text>
              </View>
              <View style={[styles.row]}>
                <MaterialCommunityIcons size={24} name="map-marker" color="#000"/>
                <Text style={[styles.alignText]}>{game.location}</Text>
              </View>
            </View>

            <View style={[styles.column, {flex: 2}]}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={[styles.row]}>
                  <MaterialCommunityIcons size={24} name="account-group" color="#000"/>
                  <Text style={[styles.alignText]}>{game.players.length}/{game.total_places}</Text>
                </View>
                <View style={[styles.row]}>
                  {goalies}
                </View>
              </View>
              <PerformanceLevelPucks puckSize={24} iconKey={game.id.toString()} perfLevel={game.exp_level} style={[styles.row, {justifyContent: 'space-between'}]}/>
            </View>

          </View>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  column: {
    flexDirection: "column",
	  flex: 1,
  },
  alignText: {
    marginLeft: 5,
    marginTop: 3,
  },
  name: {
    marginLeft: 2,
    marginBottom: 5,
    fontSize: 16,

  }
});

