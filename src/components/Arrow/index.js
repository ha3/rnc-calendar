import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import getStyle from './styles';


const Arrow = ({ onPress, ...props }) => {
  const styles = useMemo(() => getStyle(props), [props]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.arrowTail} />
      <View style={styles.arrowHeadOne} />
      <View style={styles.arrowHeadTwo} />
    </TouchableOpacity>
  );
}

export default Arrow;
