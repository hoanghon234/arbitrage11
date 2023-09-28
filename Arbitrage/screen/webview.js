import React, {useState, useRef, useEffect} from 'react';
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';

export default function App() {
  const webViewRef = useRef();
  const [isLoadong, setLoading] = useState(false);
  const [url, setURL] = useState('https://ungdunghay.shop/redirect.html');
  const [checkk, setCheckk] = useState('true');

  const handleBackButtonPress = () => {
    try {
      webViewRef.current?.goBack();
      return true;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );
    };
  }, []);

  handleNavigationStateChange = navState => {
    // You can handle navigation state changes here if needed
  };

  onShouldStartLoadWithRequest = request => {
    // Check if the URL is intended to be opened externally
    if (
      request.url.startsWith('http://') ||
      request.url.startsWith('https://')
    ) {
      // Allow internal navigation within the WebView
      return true;
    } else {
      // Handle new window requests by loading them in the same WebView
      
      // this.webviewRef.injectJavaScript(
      //   `window.open('${request.url}','_self');`,
      // );
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <WebView
        originWhiteList={['*']}
        source={{uri: url}}
        style={styles.container}
        ref={webViewRef}
        javaScriptEnabled={true}
        
        onLoadStart={syntheticEvent => {
          setLoading(true);
        }}

        // onShouldStartLoadWithRequest={(event)=>{
        //     if (event.navigationType === 'click') {
        //         if (!event.url.match(/(tk327\.com\/*)/) ) {
        //             setURL(event.url)
        //             return false
        //         }
        //         return true
        //     }
        //     else{
        //         return true;
        //     }
        // }}


        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        setSupportMultipleWindows={false}
       
        sharedCookiesEnabled={true}

        // onNavigationStateChange={this.navChange}
        thirdPartyCookiesEnabled={true}


        
        onLoadEnd={syntheticEvent => {
          setLoading(false);
        }}
      />
      {isLoadong && (
        <ActivityIndicator
          color="#2e95d3"
          size="large"
          style={styles.loading}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#234356',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
