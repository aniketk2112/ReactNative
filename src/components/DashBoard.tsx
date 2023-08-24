import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert,TouchableOpacity,Image,Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FormComponent from './Form';


interface FormComponentProps {
    onSignOut: () => void;
  }
  

 
  const DashBoard:React.FC<FormComponentProps> = ({ onSignOut }) => {
    const [showForm, setShowForm] = useState(false);
    const handleLoadTasks = () => {
        setShowForm(true);
      };


    return (
        
        <View style={styles.container}>
        

        {showForm ? (
            <FormComponent onSignOut={onSignOut} />
        ) : (
            <>
                <Image source={require('../assets/logo.png')} style={styles.topImage} />
                <TouchableOpacity onPress={handleLoadTasks} style={styles.buttonContainer}>
                    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.buttonGradient}>
                        <Text style={styles.buttonText}>Ver Tareas Abiertas</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={onSignOut} style={styles.buttonContainer}>
                    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.buttonGradient}>
                        <Text style={styles.buttonText}>Salir</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </>
        )}
    </View>
     
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
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
       marginBottom: {
       marginBottom: 20,
     },
     scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    topImage: {
      width: '90%', // or a specific width like 300
      height: 120,   // adjust as needed
      marginBottom: 20,   // adds some space between the image and the next component
    },
    header: {
      fontSize: 20,
      padding: 10,
      backgroundColor: '#8EAC50',
    },
    dropdownContainer: {
      marginTop: 10,
    }
  });

export default DashBoard;
