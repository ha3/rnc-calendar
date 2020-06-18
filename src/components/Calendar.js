import React, { useReducer, useCallback, useEffect, useRef, memo } from 'react';
import { View } from 'react-native';

import { MONTHS, DAYS, PREV_MONTH, NEXT_MONTH } from '../constants';
import { isForbiddenSelector } from '../utils/isForbiddenSelector';
import { isDateObject } from '../utils/isDateObject';
import { CalendarContext } from '../context';
import { useDidUpdateEffect } from '../hooks';

import Header from './Header';
import Month from './Month';

import styles from '../styles';


const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const initialState = {
  selectedDate: today,
  currentMonth: currentMonth,
  currentYear: currentYear
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_DATE': {
      const targetDate = action.payload.day;
      let newSelectedDate, newCurrentMonth, newCurrentYear;

      if (isDateObject(targetDate)) {
        newSelectedDate = targetDate;

        if (newSelectedDate.getMonth() !== state.currentMonth) {
          newCurrentMonth = newSelectedDate.getMonth();
        }
        if (newSelectedDate.getFullYear() !== state.currentYear) {
          newCurrentYear = newSelectedDate.getFullYear();
        }
      }
      else {
        newSelectedDate = new Date(state.currentYear, state.currentMonth, targetDate);
      }

      return {
        ...state,
        selectedDate: newSelectedDate,
        ...newCurrentMonth && {currentMonth: newCurrentMonth},
        ...newCurrentYear && {currentYear: newCurrentYear}
      }
    }


    case 'SET_MONTH': {
      const targetMonth = action.payload.month;
      const [isPreviousScrollForbidden, isForwardScrollForbidden] = isForbiddenSelector(state, action.props);

      if (
        (isPreviousScrollForbidden && targetMonth === PREV_MONTH) ||
        (isForwardScrollForbidden && targetMonth === NEXT_MONTH)
      )  return state;

      let newCurrentMonth, newCurrentYear, newDate;

      if (state.currentMonth === MONTHS.JANUARY && targetMonth === PREV_MONTH) {
        newCurrentMonth = MONTHS.DECEMBER;
        newCurrentYear = state.currentYear - 1;
      }
      else if (state.currentMonth === MONTHS.DECEMBER && targetMonth === NEXT_MONTH) {
        newCurrentMonth = MONTHS.JANUARY;
        newCurrentYear = state.currentYear + 1;
      }
      else {
        newCurrentMonth = state.currentMonth + targetMonth;
      }

      if (action.payload.day !== undefined) {
        newDate = new Date(
          newCurrentYear ? newCurrentYear : state.currentYear,
          newCurrentMonth,
          action.payload.day
        );
      }

      return {
        ...state,
        currentMonth: newCurrentMonth,
        ...newCurrentYear && { currentYear: newCurrentYear },
        ...newDate && { selectedDate: newDate }
      }
    }

    default:
      return state;
  }
}

let renderingCount = 0;

const Calendar = props => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...props.currentDate && {
      selectedDate: props.currentDate,
      currentMonth: props.currentDate.getMonth(),
      currentYear: props.currentDate.getFullYear()
    }
  });
  const dispatchWithProps = useCallback(args => dispatch({...args, props: {...props}}), [props]);
  const prevMonth = useRef();
  const prevYear = useRef();

  console.log("rendering", ++renderingCount, state.currentMonth);

  useEffect(() => {
    if (props.currentDate) {
      dispatch({
        type: 'SET_SELECTED_DATE',
        payload: { day: props.currentDate }
      });
    }
  }, [props.currentDate]);

  useDidUpdateEffect(() => {
    if (props.onMonthChange && prevMonth.current && prevMonth.current !== state.currentMonth) {
      props.onMonthChange(state.currentMonth);
    }

    prevMonth.current = state.currentMonth;
  }, [state.currentMonth, props.onMonthChange]);

  useDidUpdateEffect(() => {
    if (props.onYearChange && prevYear.current && prevYear.current !== state.currentYear) {
      props.onYearChange(state.currentYear);
    }

    prevYear.current = state.currentYear;
  }, [state.currentYear, props.onYearChange]);

  return (
    <CalendarContext.Provider value={dispatchWithProps}>
      <View style={styles.calendar}>
        <Header
          selectedMonth={state.currentMonth}
          selectedYear={state.currentYear}
          {...props}
        />
        <Month state={state} {...props} />
      </View>
    </CalendarContext.Provider>
  );
}

Calendar.defaultProps = {
  firstDayOfTheWeek: DAYS.MONDAY,
}

export default memo(Calendar);
