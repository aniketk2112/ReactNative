import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import functions from './funcions/submit'; 

const Section: React.FC<{ title: string; isOpen: boolean; toggle: () => void }> = ({ title, isOpen, toggle, children }) => (
  <View style={styles.section}>
    <TouchableOpacity onPress={toggle}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </TouchableOpacity>
    {isOpen && children}
  </View>
);

const App: React.FC = () => {
  const [tecName, setNametec] = useState('');
  const [supName, setNamesup] = useState('');
  const [sectionOpen, setSectionOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [ruc, setRuc] = useState('');
  const [mobile, setMobile] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [responsible, setResponsible] = useState('');
  const [sectionClient, setSectionClient] = useState(false);

  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
        if (state.isConnected) {
            functions.sendDataToAPI();
        }
    });
    return () => {
        unsubscribe();
    };
}, []);

  const handleSubmit = () => {
   
    if (isConnected) {
      // Directly send data to the API if online
      const formData = {
          tecName: tecName,
          supName: supName
      };
      functions.sendDataToAPI(formData);
  } else {
      // Save the form data to SQLite if offline
  
      functions.saveData(tecName, supName);
      Alert.alert("Offline", "No tiene conexion a internet estable! Se guardara los datos localmente y se subira cuando tenga conexion estable.");
  }
  };

  return (
    <View style={styles.container}>
      <Section title="Datos de los tecnicos" isOpen={sectionOpen} toggle={() => setSectionOpen(!sectionOpen)}>
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
      </Section>
      <Section title="Datos del Cliente" isOpen={sectionClient} toggle={() => setSectionClient(!sectionClient)}>
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
      </Section>
      <Button title="Guardar" onPress={handleSubmit} />
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;
