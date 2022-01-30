import React, { useEffect } from 'react';
import { StyleSheet  } from 'react-native';
import { Button } from '../../components/auth';

import { Text, View } from '../../components/main/Themed';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signOut } from '../../features/auth/authSlice';
import { NavProps } from '../auth';
import { AthleteRole } from 'puckee-common/types';
import PerformanceLevelPucks from '../../components/main/PerformanceLevelPucks';

export default function ProfileScreen({ navigation }: NavProps) {
    const { token, userData } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (!token) {
        navigation.navigate('Home')
      }
    })

    const printRoles = () => {
      const roles = userData.roles
                        .filter((roleId: number) => roleId > 1)
                        .map((roleId: number) => AthleteRole[roleId])
      return roles.join(", ")
    }

    const _onSignOutPressed = () => dispatch(signOut())

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.title}>{userData.name}</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
          
          <View style={styles.userDetailsEntry}>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}><Text style={styles.userDetailsCaption}>E-mail</Text></View>
            </View>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}><Text style={styles.userDetailsText}>{userData.email}</Text></View>
            </View>
          </View>
          <View style={styles.userDetailsEntry}>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}><Text style={styles.userDetailsCaption}>Athlete roles</Text></View>
            </View>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}><Text style={styles.userDetailsText}>{printRoles()}</Text></View>
            </View>
          </View>
          <View style={styles.userDetailsEntry}>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}><Text style={styles.userDetailsCaption}>Player skill level</Text></View>
              {/* <View style={styles.userDetailsCell}><Text style={styles.userDetailsText}>{userData.perf_level}</Text></View> */}
            </View>
            <View style={styles.userDetailsRow}>
              <View style={styles.userDetailsCell}>
                  {/* <PerformanceLevelPucks iconKey={userData.id.toString()} perfLevel={userData.perf_level} style={[styles.row, {justifyContent: 'space-between'}]}/> */}
                  <PerformanceLevelPucks puckSize={36} iconKey={userData.id.toString()} perfLevel={userData.perf_level} style={styles.row}/>
              </View>
            </View>
          </View>
          <Button mode="contained" onPress={_onSignOutPressed}>Sign out</Button>
            {/* <EditScreenInfo path="/screens/TabTwoScreen.tsx" /> */}
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    profile: {
      marginHorizontal: 40,
      marginVertical: 40,
      flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
      },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '100%',
    },
    userDetailsEntry: {
      flex: 1,
      paddingVertical: 10,
      marginVertical: 10
    },
    userDetailsRow: {
      flex: 0.8,
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
    userDetailsCell: {
      flex: 1,
      alignSelf: 'stretch',
      fontWeight: 'bold',
    },
    userDetailsText: {
      fontWeight: 'bold',
      fontSize: 18
    },
    userDetailsCaption: {
      fontSize: 12,
    }
});