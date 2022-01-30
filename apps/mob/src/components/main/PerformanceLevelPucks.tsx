import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from './Themed';
import { StyleProp, ViewStyle } from 'react-native'
import  { Background } from '../../components/auth'

type Props = {
    perfLevel: number
    puckSize: number
    iconKey: string
    style?: StyleProp<ViewStyle>
  }  

const PerformanceLevelPucks = ( {perfLevel, puckSize, iconKey, style}: Props ) : JSX.Element => {
    let levelPucks: any[] = []

    for(let i=0; i < 6; i++) {
        if(i < perfLevel) {
            levelPucks.push(<MaterialCommunityIcons  name="hockey-puck" size={puckSize} color="#000000" key={iconKey + ":level " + i}/>);
        } else {
            levelPucks.push(<MaterialCommunityIcons  name="hockey-puck" size={puckSize} color="#dcdcdc" key={iconKey + ":level" + i}/>);
        }
      }

    return (
      // <Background>
      <View style={style}>
        {levelPucks}
      </View>
      // </Background>
    )
}

export default PerformanceLevelPucks
