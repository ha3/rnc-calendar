import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { THIS_MONTH } from '../../constants';
import { useCalendar } from '../../hooks';

import Text from '../Text';

import styles from './styles';



const Day = memo(({ day, isPressed, isDisabled }) => {
  const dispatch = useCalendar();

  const onPress = () => {
    if (isDisabled) return;

    if (day.month === THIS_MONTH) {
      dispatch({
        type: 'SET_SELECTED_DATE',
        payload: {
          day: day.value
        }
      });
    }
    else {
      dispatch({
        type: 'SET_MONTH',
        payload: {
          month: day.month,
          day: day.value
        }
      });
    }
  }

  const color = isDisabled ? 'yellow' : day.month !== THIS_MONTH ? 'purple' :  undefined;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        isPressed={isPressed}
        onPress={onPress}
        disabled={isDisabled}
      >
        <Text color={color}>
          {day.value}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default Day;
