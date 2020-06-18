import React, { useState, useLayoutEffect, memo, useMemo } from 'react';
import { View } from 'react-native';

import getDaysOfMonth from '../../utils/getDaysOfMonth';
import { THIS_MONTH } from '../../constants';

import Day from '../Day';

import styles from './styles';


const Month = ({ state, ...props }) => {
  const { selectedDate, currentMonth, currentYear } = state;
  const [days, setDays] = useState([]);
  const allowedDates = useMemo(() => (
    props.allowedDates !== undefined &&
    props.allowedDates
    .filter(date => date.getMonth() === currentMonth)
    .map(date => date.getDate())
  ), [props.allowedDates, currentMonth]);

  useLayoutEffect(() => {
    setDays(getDaysOfMonth(currentYear, currentMonth, props.firstDayOfTheWeek));
  }, [currentMonth, setDays]);

  return (
    <View style={styles.month}>
      {days.map(
        (day, i) => {
          const isPressed = (
            day.value === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear() &&
            day.month === THIS_MONTH
          );

          const isDisabled = allowedDates && !allowedDates.includes(day.value);

          return (
            <Day
              key={i}
              day={day}
              isPressed={isPressed}
              isDisabled={isDisabled}
            />
          );
        }
      )}
    </View>
  );
}

export default memo(Month);
