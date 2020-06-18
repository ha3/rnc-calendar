import { DAYS, PREV_MONTH, THIS_MONTH, NEXT_MONTH } from '../constants';

function getDaysOfMonth(year, month, firstDayOfTheWeek) {
  const lastDayOfTheWeek = (
    firstDayOfTheWeek === DAYS.SUNDAY ?
    DAYS.SATURDAY :
    firstDayOfTheWeek - 1
  );

  const firstDayOfTheMonth = new Date(year, month, 1).getDay();
  const lastDayOfThePreviousMonth = new Date(
    year,
    month,
    0
  ).getDate();
  const lastDateOfTheCurrentMonth = new Date(year, month + 1, 0);
  const lastDayOfTheCurrentMonth = lastDateOfTheCurrentMonth.getDay();
  const dayCount = lastDateOfTheCurrentMonth.getDate();

  const days = [];

  if (firstDayOfTheMonth !== firstDayOfTheWeek) {
    const slot = (
      firstDayOfTheMonth - firstDayOfTheWeek > 0 ?
      firstDayOfTheMonth - firstDayOfTheWeek :
      7 + firstDayOfTheMonth - firstDayOfTheWeek
    );

    for (let i = slot - 1; i >= 0; i--) {
      days.push({
        value: lastDayOfThePreviousMonth - i,
        month: PREV_MONTH
      });
    }
  }

  for (let i = 1; i <= dayCount; i++) {
    days.push({
      value: i,
      month: THIS_MONTH
    });
  }

  if (lastDayOfTheCurrentMonth !== lastDayOfTheWeek) {
    const arr = [...Array(7).keys()];
    arr.unshift.apply(arr, arr.splice(7-lastDayOfTheCurrentMonth, 7));
    const slot = arr[lastDayOfTheWeek];

    for (let i = 1; i <= slot; i++) {
      days.push({
        value: i,
        month: NEXT_MONTH
      });
    }
  }

  return days;
}

export default getDaysOfMonth;
