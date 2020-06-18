import { Stylesheet } from 'react-native';

const getStyle = props => {

  return Stylesheet.create({
    container: {
      width: '13%',
      textAlign: 'center',
      backgroundColor: 'red'
    },
    button: {
      width: 40,
      height: 40,
      borderRadius: 20,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    text: {

    }
  });
}

export default getStyle;
