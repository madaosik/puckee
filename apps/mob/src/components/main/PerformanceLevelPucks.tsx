import React from 'react';
import { View } from './Themed';
import { levelPucksSet, LevelPucksProps } from 'puckee-common/utils/levelPucks'

const PerformanceLevelPucks = ( { style, ...props } : LevelPucksProps ) => {
    const levelPucks = levelPucksSet(props)
    return (
      <View style={style}>
        {levelPucks}
      </View>
    )
}

export default PerformanceLevelPucks

