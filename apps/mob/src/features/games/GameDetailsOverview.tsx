import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { format } from 'date-fns';
import { Button, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Button as PaperButton, Dialog, Portal, RadioButton } from 'react-native-paper'

import { selectGameById } from './gamesSlice'
import { useAppSelector } from 'puckee-common/redux'
import { Text, View } from '../../components/main/Themed';
import { IAthlete, IGame } from 'puckee-common/types';
import { GameStackScreenProps } from '../../types/navigation';
import { GameDetailsNavigationBar } from './GameDetailsNavigationBar';
import { API_BASE } from 'puckee-common/api';
import { Snackbar } from 'react-native-paper';

const viewLightColor = "#555"
const viewDarkColor = "#888"
const textLightColor = "#FFF"
const textDarkColor = "#000"

function BasicDescription(game: IGame) {
    const startTime = Date.parse(game.start)
    const endTime = startTime + Date.parse("1970-01-01T" + game.duration) // Convert duration to milliseconds
    return (
        <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.container, styles.column, {flex: 4}]}>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                <MaterialCommunityIcons name="calendar" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>{format(Date.parse(game.start), "EEEE dd/MM/yyyy")}</Text>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                <MaterialCommunityIcons name="clock" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>{format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}</Text>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                <MaterialCommunityIcons name="map-marker" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>{game.location}</Text>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                <MaterialCommunityIcons name="account-supervisor" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>{game.organizers.map(o => o.name).join(", ")}</Text>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                <Entypo name="price-tag" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>250 Kč</Text>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {flex: 5}]}>
                <MaterialIcons name="description" size={24} color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text]}>Description placeholder</Text>
            </View>
        </View>
    );
}

function Features(game: IGame) {
    return (
        <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.container, styles.row, {flex: 1}]}>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.column, {alignItems: "center"}]}>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row,]}>
                    <MaterialCommunityIcons style={{marginRight: 5}} name="locker-multiple" color="#FFF" size={36}/>
                    <MaterialCommunityIcons name='check' color="#00A170" size={36}/>
                </View>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row]}>
                    <FontAwesome5 style={{marginRight: 5}} name="shower" color="#FFF" size={36}/>
                    <MaterialCommunityIcons name='check' color="#00A170" size={36}/>
                </View>
            </View>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {alignItems: "center", justifyContent: "center"}]}>
                <FontAwesome5 name="shield-virus" color="#00A170" size={48}/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text, {fontSize: 14}]}>Covid-19 vaccination required</Text>
            </View>
        </View>
    );
}


function Summary(game: IGame) {
    const level: any = [];
    const goalies: any = [];

    for(let i=0; i < 6; i++) {
      if(i < game.exp_level) {
        level.push(<MaterialCommunityIcons  name="hockey-puck" size={32} color="#FFF" key={game.id + ":level " + i}/>);
      } else {
        level.push(<MaterialCommunityIcons  name="hockey-puck" size={32} color="#AAA" key={game.id + ":level" + i}/>);
      }
    }

    if(game.goalies !== undefined) {
        for(let i=0; i < 2; i++) {
            if(i < game.goalies.length) {
              goalies.push(<MaterialCommunityIcons size={32} name="shield" key={i + "_shield"} color="#FFF"/>);
            } else {
              goalies.push(<MaterialCommunityIcons size={32} name="shield" key={i + "_shield"} color="#AAA"/>);
            }
        }
    }

    return (
        <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.container, styles.column, {flex: 1}]}>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {alignItems: "center"}]}>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {flex: 2}]}>
                    {goalies}
                </View>
                <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {flex: 5}]}>
                    {level}
                </View>
                <MaterialCommunityIcons 
                    name="whistle" size={32} color={game.referees.length == 0 ? "#CD212A" : "#00A170"} style={[{flex: 1}]}
                />
            </View>
            <View style={[styles.separator]}/>
            <View lightColor={viewLightColor} darkColor={viewDarkColor} style={[styles.row, {alignItems: "center", justifyContent: "center"}]}>
                <MaterialCommunityIcons size={32} name="account-group" color="#FFF"/>
                <Text lightColor={textLightColor} darkColor={textDarkColor} style={[styles.text, {fontSize: 24}]}>{game.players.length}/{game.total_places}</Text>
            </View>
        </View>
    );
}

function JoinGameButton(onPress: any) {
    return (
        <View style={[{margin: 5, marginBottom: 15, alignItems: 'center' }]}>
            <View style={[{width: "50%"}]}>
                <Button onPress={onPress} color="#00A170" title='JOIN GAME'/>
            </View>
        </View>
    )
}

function LeaveGameButton(onPress: any) {
    return (
        <View style={[{margin: 5, marginBottom: 15, alignItems: 'center' }]}>
            <View style={[{width: "50%"}]}>
                <Button onPress={onPress} color="#CD212A" title='LEAVE GAME'/>
            </View>
        </View>
    )
}

async function changeStateGame(join: boolean, game: IGame, userData: {}, role: number, showError: any) {
    const token = await SecureStore.getItemAsync('secure_token')
      .catch(error => console.error("Could not retrieve secure access token: " + error));

      console.log(JSON.stringify({athlete_id: userData.id, athlete_role: role}))

    const response = await fetch(`${API_BASE}/game/${game.id}/participants`, {
        method: join ? 'POST' : 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({athlete_id: userData.id, athlete_role: role})
    });
    if (response.status != 204) {
        console.log(response.status)
        showError()
        return false
    }
    return true
}


export default function GameDetailsOverview({ route, navigation }: GameStackScreenProps<'GameDetailsOverview'>) {
    const { gameId } = route.params;
    const game: IGame = useAppSelector(state => selectGameById(state, gameId)) as IGame
    const { userData } = useAppSelector((state) => state.auth)

    const [dialogVisible, setDialogVisible] = useState(false)
    const [errorVisible, setErrorVisible] = useState(false)
    const [successVisible, setSuccessVisible] = useState(false)
    const [role, setRole] = useState(1)


    const showDialog = () => setDialogVisible(true)
    const hideDialog = () => setDialogVisible(false)
    const showError = () => setErrorVisible(true)
    const hideError = () => setErrorVisible(false)
    const showSuccess = () => setSuccessVisible(true)
    const hideSuccess = () => setSuccessVisible(false)


    const onJoin = async () => {
        hideDialog()
        if(await changeStateGame(true, game, userData, role, showError)) {
            showSuccess()
        }
    }

    const onLeave = async () => {
        if(await changeStateGame(false, game, userData, userRoleInGame, showError)) {
            showSuccess()
        }
    }
    

    const arePlacesLeft = game.players.length < game.total_places || game.goalies.length < 2 || game.referees.length === 0

    let userInGame: IAthlete | undefined = game.players.concat(game.goalies.concat(game.referees)).find(a => a.id === userData.id)
    const registered = userInGame !== undefined
    let userRoleInGame: number = 0

    if(registered) {
        if(game.players.indexOf(userInGame as IAthlete) !== -1) {
            userRoleInGame = 1
        } else if(game.goalies.indexOf(userInGame as IAthlete) !== -1) {
            userRoleInGame = 2
        } else if(game.referees.indexOf(userInGame as IAthlete) !== -1) {
            userRoleInGame = 3
        }
    }

    return (
        <View style={[styles.column]}>
            <GameDetailsNavigationBar onPressed={(path: any) => navigation.navigate(path, route.params)}/>
            <Text lightColor={textDarkColor} darkColor={textLightColor} style={[styles.header]}>Basic description</Text>
            {BasicDescription(game)}
            <Text lightColor={textDarkColor} darkColor={textLightColor} style={[styles.header]}>Features</Text>
            {Features(game)}
            <Text lightColor={textDarkColor} darkColor={textLightColor} style={[styles.header]}>Summary</Text>
            {Summary(game)}
            {
                registered 
                ? LeaveGameButton(onLeave)
                : arePlacesLeft 
                    ? JoinGameButton(showDialog) 
                    : <View/>
            }

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Choose a role</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={newValue => setRole(parseInt(newValue))} value={role.toString()}>
                            <View style={[{flexDirection: "row", alignItems: "center"}]}>
                                <RadioButton value="1" />
                                <Text>Player</Text>
                            </View>
                            <View style={[{flexDirection: "row", alignItems: "center"}]}>
                                <RadioButton value="2" />
                                <Text>Goalie</Text>
                            </View>
                            <View style={[{flexDirection: "row", alignItems: "center"}]}>
                                <RadioButton value="3" />
                                <Text>Referee</Text>
                            </View>
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <PaperButton onPress={onJoin}>Submit</PaperButton>
                    </Dialog.Actions>
                </Dialog>

                <Snackbar
                    theme={{colors: {onSurface: "#CD212A", text: "#FFF"}}}
                    visible={errorVisible}
                    onDismiss={hideError}>
                    An error occured, pleaase try again later
                </Snackbar>

                <Snackbar
                    theme={{colors: {onSurface: "#00A170", text: "#FFF"}}}
                    visible={successVisible}
                    onDismiss={hideSuccess}>
                    Succesfully updated
                </Snackbar>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        padding: 10,
        margin: 3,
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
    text: {
      marginLeft: 5,
      marginTop: 3,
    },
    name: {
      marginLeft: 2,
      marginBottom: 5,
      fontSize: 16,
    },
    separator: {
        height: 0.5,
        width: '100%',
    },
    header: {
        textAlign: "right", 
        marginRight: 5, 
        fontWeight: "bold"
    }
  }); 