import React from 'react';
import { Text } from 'react-native';


const Text = ({ children,...props }) => {
  return (
    <Text style={...props}>
      {children}
    </Text>
  );
}

Text.defaultProps = {
  color: 'white',
  textAlign: 'center'
}

export default Text;
