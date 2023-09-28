import React, { useEffect } from 'react';
import { Alert, BackHandler, SafeAreaView, StyleSheet } from 'react-native';
import WebViewBrowser from './screen/webview';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebViewBrowser />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
