import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, StyleSheet, Switch } from 'react-native';
import { LevelSlider } from '../../components/auth';
import PerformanceLevelPucks from '../../components/main/PerformanceLevelPucks';

import { Text, View } from '../../components/main/Themed';
import { toggleMyAttFilter, toggleMyOrgFilter, toggleBySkillFilter, setReqSkillLevelValue } from '../../features/games/gamesSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { theme } from '../../utils/theme'

export default function ModalScreen() {
  const dispatch = useAppDispatch()
  const { activeFilters } = useAppSelector((state) => state.games)
  const [perfLevel, setPerfLevel] = useState(3)

  const [onlyMyAttended, setonlyMyAttended] = useState(activeFilters.myAttended);
  const [onlyMyOrganized, setonlyMyOrganized] = useState(activeFilters.myOrganized);
  const [bySkill, setbySkill] = useState(activeFilters.BySkill.skillFilter);

  const toggleMyAttendedSwitch = () => {
    dispatch(toggleMyAttFilter())
    setonlyMyAttended(previousState => !previousState);
  }

  const toggleMyOrganizedSwitch = () => {
    dispatch(toggleMyOrgFilter())
    setonlyMyOrganized(previousState => !previousState)
  }

  const togglebySkillSwitch = () => {
    dispatch(toggleBySkillFilter())
    setbySkill(previousState => !previousState)
  }


  const onSlidingComplete = (val: number) => {
    dispatch(setReqSkillLevelValue(val))
    setPerfLevel(val)
  }
  
  const renderSkillFilter = (): JSX.Element => {
      return (
        <View style={styles.perfFilterArray}>
          <View style={styles.skillFilterRow}>
            <PerformanceLevelPucks puckSize={50} iconKey="filterPucks" perfLevel={activeFilters.BySkill.skillMinVal} style={styles.skillPucks}/>
          </View>
          <View style={styles.skillFilterRow}>
            <LevelSlider initValue={activeFilters.BySkill.skillMinVal} onSlidingComplete={onSlidingComplete} minValue={1}/>
          </View>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterArray}>
        <View style={styles.checkboxRow}>
          <View style={styles.checkboxDesc}>
            <Text style={styles.label}>Show only games I have already joined</Text>
          </View>
          <View style={styles.checkboxCell}>
                <Switch
                trackColor={{ false: "#767577", true: theme.colors.primary}}
                thumbColor={onlyMyAttended ? "white" : "#f4f3f4"}
                ios_backgroundColor="grey"
                onValueChange={toggleMyAttendedSwitch}
                value={onlyMyAttended}
              />

          </View>
              {/* <View style={styles.checkboxCell}><Text style={styles.userDetailsCaption}>E-mail</Text></View> */}
        </View>
          <View style={styles.checkboxRow}>
              <View style={styles.checkboxDesc}>
                <Text style={styles.label}>Show only games organized by me</Text>
              </View>
              <View style={styles.checkboxCell}>
                <Switch
                  trackColor={{ false: "#767577", true: theme.colors.primary }}
                  thumbColor={onlyMyOrganized ? "white" : "#f4f3f4"}
                  ios_backgroundColor="grey"
                  onValueChange={toggleMyOrganizedSwitch}
                  value={onlyMyOrganized}
                />
              </View>
              {/* <View style={styles.checkboxCell}><Text style={styles.checkboxText}>{userData.email}</Text></View> */}
          </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        <View style={styles.checkboxRow}>
              <View style={styles.checkboxDesc}>
                <Text style={styles.label}>By expected skill level</Text>
              </View>
              <View style={styles.checkboxCell}>
                <Switch
                  trackColor={{ false: "#767577", true: theme.colors.primary }}
                  thumbColor={bySkill ? "white" : "#f4f3f4"}
                  ios_backgroundColor="grey"
                  onValueChange={togglebySkillSwitch}
                  value={bySkill}
                />
              </View>
        </View>
      </View>
      { bySkill ? renderSkillFilter() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  filterArray: {
    flex: 0.6,
    marginTop: 20,
    alignItems: 'center',
  },
  perfFilterArray: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 3,
    width: '80%',
    alignItems: 'center'
  },
  label: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  userDetailsEntry: {
    flex: 1,
    marginVertical: 10,
  },
  skillPucks: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginHorizontal: 30
  },
  skillFilterRow: {
    flex: 0.2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginHorizontal: 30
  },
  checkboxCell: {
    flex: 1,
    alignSelf: 'stretch',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDesc: {
    flex: 1,
    alignSelf: 'stretch',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});
