// FormComponent.js

import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert ,ActivityIndicator,ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { saveDataLocally, fetchLocalData,fetchAndSendData } from '../helpers/sqlHeelper';
import { FormDataSchema } from '../models/formData';
import Realm from 'realm';
import LinearGradient from 'react-native-linear-gradient';

interface FormComponentProps {
   onSignOut: () => void;
 }

const FormComponent: React.FC<FormComponentProps> = ({ onSignOut }) => {
   const [loading, setLoading] = useState(false);
  const [tecName, setNametec] = useState('');
  const [supName, setNamesup] = useState('');
  const [state, setState] = useState(false);

  const [clientName, setClientName] = useState('');
  const [ruc, setRuc] = useState('');
  const [mobile, setMobile] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [responsible, setResponsible] = useState('');
//   const [sectionClient, setSectionClient] = useState(false);

   const [data, setData] = useState('');
   const [localDataExists, setLocalDataExists] = useState(false);
   const [openSection, setOpenSection] = useState(null); // 'section1', 'section2'


   useEffect(() => {
      let verify=state
      if (!verify){
         handleRefresh()
      }
    checkLocalData();
    
    }, []);

    const checkLocalData = async () => {
        try {
            const savedData = await fetchLocalData();
           if (savedData !== null) {
              setLocalDataExists(true);
           }
        } catch (error) {
         setLocalDataExists(false);
           console.error("Failed to fetch local data.", error);
        }
     };
     const handleRefresh = async () => {
      setState(true)
      fetchAndSendData()
          
     };

   const handleAPISubmission = () => {
      setLoading(true);
      fetch('http://10.1.1.141:5000/odooCompulabTest', {
         method: 'POST', 
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            tecName: tecName,
            supName: supName,
            clientName: clientName,
            ruc: ruc,
            mobile: mobile,
            telephone: telephone,
            email: email,
            address: address,
            responsible: responsible
         }),
         })
         .then((response) =>{ 
            setNametec('')
            setNamesup('')
            setClientName('')
            setRuc('')
            setMobile('')
            setTelephone('')
            setEmail('')
            setAddress('')
            setResponsible('')
            response.json()})
         .then((data) => {
            setNametec('')
            setNamesup('')
            setClientName('')
            setRuc('')
            setMobile('')
            setTelephone('')
            setEmail('')
            setAddress('')
            setResponsible('')
            setLoading(false);
            Alert.alert("Success!", "Enviado")})
         .catch((error) =>{
            setNametec('')
            setNamesup('')
            setClientName('')
            setRuc('')
            setMobile('')
            setTelephone('')
            setEmail('')
            setAddress('')
            setResponsible('')
            setLoading(false);
             Alert.alert("Error!", "Error en el proceso de enviar, se guardara localmente")});

   };

   const handleLocalSubmission = async () => {
      try {
    
        saveDataLocally({
            _id: new Realm.BSON.ObjectId(),
            tecName: tecName,
            supName: supName,
            clientName: clientName,
            ruc: ruc,
            mobile: mobile,
            telephone: telephone,
            email: email,
            address: address,
            responsible: responsible
          });
          setNametec('')
            setNamesup('')
            setClientName('')
            setRuc('')
            setMobile('')
            setTelephone('')
            setEmail('')
            setAddress('')
            setResponsible('')
         Alert.alert("Success!", "Data saved locally.");
      } catch (error) {
         Alert.alert("Error", "Failed to save data.");
      }
   };

   const handleSubmit = () => {
      NetInfo.fetch().then(state => {
         if (state.isConnected) {
            handleAPISubmission();
         } else {
            handleLocalSubmission();
         }
      });
   };

   return (
      
      <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
        <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      ></ScrollView>
         <Image source={require('../assets/logo.png')} style={styles.topImage} />

          <TextInput 
            style={styles.input} 
            placeholder="Nombre del Tecnico" 
            value={tecName} 
            onChangeText={setNametec}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Nombre del Ayudante" 
            value={supName} 
            onChangeText={setNamesup}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Nombre del Cliente o Empresa" 
            value={clientName} 
            onChangeText={setClientName}
         />
         <TextInput 
            style={styles.input} 
            placeholder="C.I/PASS/RUC" 
            value={ruc} 
            onChangeText={setRuc}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Celular" 
            value={mobile} 
            onChangeText={setMobile}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Telefono" 
            value={telephone} 
            onChangeText={setTelephone}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Direccion" 
            value={address} 
            onChangeText={setAddress}
         />
         <TextInput 
            style={styles.input} 
            placeholder="Persona Autorizada" 
            value={responsible} 
            onChangeText={setResponsible}
         />

         
         <TouchableOpacity onPress={handleSubmit} style={[styles.buttonContainer, styles.marginBottom]}>
                <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Guardar</Text>
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
 });
export default FormComponent;
