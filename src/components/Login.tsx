import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,TouchableOpacity,Image,Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LoginPageProps {
    onLogin: (token: string) => void;
  }
  

  const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLoginAction = () => {
        
        if(username=="admin" && password=='admin'){
            // Typically, you'd call an API to login. For demonstration:
            const dummyToken = 'someRandomTokenString';
            // Inform App.tsx that login was successful and pass the token
            onLogin(dummyToken);
        }else{
            Alert.alert('Login Action', `Username: ${username}, Password: ${password}`);
        }
      };


    return (
        
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.topImage} />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleLoginAction} style={styles.buttonContainer}>
                <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Login</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
      },
      logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
      },
      input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#fff',
      },
      buttonContainer: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 10,
      },
      buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
      topImage: {
        width: '90%', // or a specific width like 300
        height: 120,   // adjust as needed
        marginBottom: 20,   // adds some space between the image and the next component
      },
  });

export default LoginPage;
