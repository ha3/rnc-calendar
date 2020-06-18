import { Stylesheet } from 'react-native';

const styles = Stylesheet.create({
  tabPanel: {
    flex: 0.15,
    backgroundColor: 'red',
  },
  dayNames: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'white'
  }
});

export default styles;
