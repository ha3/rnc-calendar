import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  months: {
    flex: 1,
  },
  month: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});

export default styles;
