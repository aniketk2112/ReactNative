import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet,View } from 'react-native';
import FormComponent from './src/components/Form';
import LoginPage from './src/components/Login';
import DashBoard from './src/components/DashBoard';
import LottieView from 'lottie-react-native';
// import './src/components/BackgroundFetch';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  const handleLogin = (receivedToken: string) => {
    setToken(receivedToken);
  };
  const handleSignOut = () => {
    setToken(null);
  };
 
  // Let's pretend we're checking a token in local storage or some other logic to check if user is logged in
  useEffect(() => {
    // This is a dummy example, replace with real logic if needed
     // You'd probably fetch this from AsyncStorage or another storage mechanism in a real app
    if(token) {
      setIsLoggedIn(true);
    }
    
  }, []); // Empty dependency array means this useEffect runs once after initial render

  return (
    <SafeAreaView style={styles.container}>
       {showIntro ? (
        <View style={styles.container}>
           <LottieView
           style={styles.containerAnimation}
          source={require('./src/assets/compulab.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => setShowIntro(false)}
        />
        </View>
       
      ) : token ? (
        <DashBoard onSignOut={handleSignOut} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerAnimation: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // or any other background color you want
  },
});

export default App;

