import React from 'react';
import { SafeAreaView, View } from 'react-native';

import Calendar from 'rnc-calendar';


const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Calendar />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
