import React, { useMemo, memo } from 'react';
import { View } from 'react-native';

import { DAYS, DAY_NAMES, MONTH_NAMES, PREV_MONTH, NEXT_MONTH } from '../../constants';
import { useCalendar } from '../../hooks';
import isForbiddenSelector from '../../utils/isForbiddenSelector';

import Text from '../Text';
import Arrow from '../Arrow';

import styles from './styles';


const DayNames = memo(({ firstDayOfTheWeek }) => {
  const days = useMemo(() => {
    if (firstDayOfTheWeek !== DAYS.SUNDAY) {
      DAY_NAMES.short.push.apply(DAY_NAMES.short, DAY_NAMES.short.splice(0, firstDayOfTheWeek));
    }

    return DAY_NAMES.short;
  }, [firstDayOfTheWeek]);

  return (
    <View style={styles.dayNames}>
      {days.map(day => <View key={day}><Text>{day}</Text></View>)}
    </View>
  );
});

const Header = ({ selectedMonth, selectedYear, firstDayOfTheWeek, ...props })=> {
  const dispatch = useCalendar();
  const [isPreviousScrollForbidden, isForwardScrollForbidden] = isForbiddenSelector({
    month: selectedMonth,
    year: selectedYear,
  }, props);

  return (
    <View style={styles.tabPanel}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 10 }}>
        <Arrow
          size={10}
          color="white"
          direction="left"
          disabled={isPreviousScrollForbidden}
          onPress={() => dispatch({ type: 'SET_MONTH', payload: { month: PREV_MONTH } })}
        />
        <Text>
          {MONTH_NAMES.long[selectedMonth]} {selectedYear}
        </Text>
        <Arrow
          size={10}
          color="white"
          direction="right"
          disabled={isForwardScrollForbidden}
          onPress={() => dispatch({ type: 'SET_MONTH', payload: { month: NEXT_MONTH } })}
        />
      </View>
      <DayNames firstDayOfTheWeek={firstDayOfTheWeek} />
    </View>
  );
}

export default Header;
