import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { View } from '../../components/main/Themed';

type GameDetailsNavigationBarProps = {
    onPressed: Function
}

export function GameDetailsNavigationBar(props: GameDetailsNavigationBarProps) {
    return (
        <View style={[styles.bar]} lightColor='#555' darkColor='#888'>
            <Pressable style={[styles.tab]} onPress={() => props.onPressed('GameDetailsOverview')}>
                <View lightColor='#555' darkColor='#888'>
                    <MaterialCommunityIcons name='information' color="#FFF" size={24}/>
                </View>
            </Pressable>
            <Pressable style={[styles.tab]} onPress={() => props.onPressed('GameDetailsTeams')}>
                <View lightColor='#555' darkColor='#888'>
                    <MaterialCommunityIcons name='account-group' color="#FFF" size={24}/>
                </View>
            </Pressable>
            <Pressable style={[styles.tab]} onPress={() => props.onPressed('GameDetailsChat')}>
                <View lightColor='#555' darkColor='#888'>
                    <MaterialCommunityIcons name='chat' color="#FFF" size={24}/>
                </View>
            </Pressable>
            <Pressable style={[styles.tab]} onPress={() => props.onPressed('GameDetailsMap')}>
                <View lightColor='#555' darkColor='#888'>
                    <MaterialCommunityIcons name='map' color="#FFF" size={24}/>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    tab: {
        height: 40,
        borderRadius: 0,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#FFF",
        borderWidth: 0.5,
    }
  }); 