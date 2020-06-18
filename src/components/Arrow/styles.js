import { StyleSheet } from 'react-native';

const getStyle = props => {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      overflow: 'visible',
      width: props.size * 1.9,
      height: props.size * 1.6,
      ...props.direction === 'right' && {transform: [{ rotate: '180deg' }]}
    },
    arrowTail: {
      backgroundColor: props.color,
      width: props.size * 1.3,
      height: props.size / 3.5,
      left: props.size * 0.4,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
      top: props.size * 0.65
    },
    arrowHeadTwo: {
      backgroundColor:  props.color,
      width: props.size,
      height: props.size / 3.5,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
      top: props.size * 0.9,
      transform: [{ rotate: '45deg' }]
    },
    arrowHeadOne: {
      backgroundColor: props.color,
      width: props.size,
      height: props.size / 3.5,
      borderTopColor: 'transparent',
      borderStyle: 'solid',
      position: 'absolute',
      top: props.size * 0.4,
      transform: [{ rotate: '135deg' }]
    }
  });
}

export default getStyle;
