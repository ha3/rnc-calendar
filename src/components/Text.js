import React from 'react';
import { Text as RNText } from 'react-native';


const Text = ({ children,...props }) => {
  return (
    <RNText style={...props}>
      {children}
    </RNText>
  );
}

Text.defaultProps = {
  color: 'white',
  textAlign: 'center'
}

export default Text;
