import React, { PureComponent } from 'react';
import { View } from '../../components/main/Themed';
import { GameStackScreenProps } from '../../types/navigation';
import { GameDetailsNavigationBar } from './GameDetailsNavigationBar';

export default function GameDetailsMap({route, navigation}: GameStackScreenProps<'GameDetailsMap'>) {
    return (
        <View>
            <GameDetailsNavigationBar onPressed={(path: any) => navigation.navigate(path, route.params)}/>
        </View>
    );
}