import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../../utils/theme';

type Props = {
    onSlidingComplete?: (value: number) => void
    onValueChange?: (value: number) => void
    minValue: number
    initValue: number
}

export default ( { onValueChange, onSlidingComplete, minValue, initValue }: Props ) => {
    return (
        <Slider
            style={styles.slider}
            minimumValue={minValue}
            maximumValue={6}
            step={1}
            value={initValue}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.secondary}
            onValueChange={onValueChange}
            onSlidingComplete={onSlidingComplete}
        />
    )};

const styles = StyleSheet.create({
    slider: {
        width: '100%',
        opacity: 1,
        height: 30,
        marginTop: 15,
        color: 'black'
      }
})