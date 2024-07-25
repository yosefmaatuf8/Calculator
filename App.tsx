// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Calculator from '/home/mefathim/full_stack/CalculatorApp/android/app/src/Calculator';
function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Calculator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
