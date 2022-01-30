import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SelectBox, { Item } from 'react-native-multi-selectbox-typescript';
import { xorBy } from 'lodash'
import { theme } from '../../utils/theme';
import { AthleteRole } from '../../types';

type Props = {
  updateParentRoles: (items: Item[]) => void
}

export default ( { updateParentRoles } : Props ) => {
    const [selectedRoles, setSelectedRoles] = useState<Item[] | []>([]);

    function onMultiChange() {
        return (item:Item) => setSelectedRoles(xorBy(selectedRoles, [item], 'id'))
      }

    useEffect(() => {
      updateParentRoles(selectedRoles)
    },[selectedRoles])

    const displayedRoles:Item[] = [
      {id: AthleteRole.Player, item: 'Player'}, 
      {id: AthleteRole.Goalie, item: 'Goalie'},
      {id: AthleteRole.Referee, item: 'Referee'},
    ];    

    return (
        <View style={styles.view}>
            <SelectBox
              label=""
              inputPlaceholder="Select desired hockey roles"
              containerStyle={styles.container}
              arrowIconColor={theme.colors.primary}
              toggleIconColor={theme.colors.primary} 
              hideInputFilter
              options={displayedRoles}
              optionContainerStyle={styles.optionContainer}
              multiOptionContainerStyle = {styles.selectedRole}
              selectedValues={selectedRoles}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti
            />
        </View>
      )
}

const styles = StyleSheet.create({
  view: {
    marginTop: 12,
    width: '100%',
  },
  container: {
    padding: 12,
    alignContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    backgroundColor: theme.colors.surface
  },
  optionContainer: {
    padding: 12,
    marginVertical: 2
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  selectedRole: {
    backgroundColor: theme.colors.primary,
  }
});
