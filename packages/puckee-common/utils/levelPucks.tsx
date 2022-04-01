import React from 'react';
import { StyleProp, ViewStyle } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type LevelPucksProps = {
    perfLevel: number
    puckSize: number
    iconKey: string
    style?: StyleProp<ViewStyle>
  }  

export const levelPucksSet = ( {perfLevel, puckSize, iconKey}: LevelPucksProps ) => {
    let levelPucks: any[] = []
    
    for(let i=0; i < 6; i++) {
        if(i < perfLevel) {
            levelPucks.push(<MaterialCommunityIcons  name="hockey-puck" size={puckSize} color="#000000" key={iconKey + ":activePuck " + i}/>);
            // console.log(iconKey + "-activePuck-" + i)
        } else {
            levelPucks.push(<MaterialCommunityIcons  name="hockey-puck" size={puckSize} color="#dcdcdc" key={iconKey + ":inactivePuck" + i}/>);
            // console.log(iconKey + "-inactivePuck-" + i)
          }
      }
    
    return levelPucks
}