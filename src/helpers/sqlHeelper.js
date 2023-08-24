import Realm from 'realm';
import { FormDataSchema } from '../models/formData';

const openRealm = async () => {
  return await Realm.open({
    schema: [FormDataSchema],
  });
};

const saveDataLocally = async (data) => {
  const realm = await openRealm();

  realm.write(() => {
    
    realm.create('FormData', data);
  });

  realm.close();
};

const fetchLocalData = async () => {
  // const realm = await openRealm();
  // const data = realm.objects('FormData');
  
  // realm.close();
  
  // return data;
  const realm = new Realm({ schema: [FormDataSchema] });
  const savedTodos = realm.objects('FormData');
  return savedTodos
};

const sendDataToAPI = async (dataItem) => {
  try {
    const response = await fetch('http://10.1.1.141:5000/odooCompulabTest', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
            'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tecName: dataItem.tecName,
        supName: dataItem.supName,
        clientName: dataItem.clientName,
        ruc: dataItem.ruc,
        mobile: dataItem.mobile,
        telephone: dataItem.telephone,
        email: dataItem.email,
        address: dataItem.address,
        responsible: dataItem.responsible
     }),
    });

    return response.ok;
  } catch (error) {
    console.error("Error sending data:", error);
    return false;
  }
};

const fetchAndSendData = async () => {
  let realm;

  try {
    realm = await Realm.open({schema: [FormDataSchema]});
    
    // 1. Fetch stored data
    const dataItems = realm.objects('FormData');

    // 2. Loop through each data item, send it and delete if successful
    for (let i = 0; i < dataItems.length; i++) {
      const item = dataItems[i];
      const success = await sendDataToAPI(item);

      if (success) {
        // If data sent successfully, remove from local Realm database
        realm.write(() => {
          realm.delete(item);
        });
        console.log(`Data item with id ${item.id} sent and removed from local storage.`);
      } else {
        console.log(`Failed to send data item with id ${item.id}.`);
      }
    }
  } catch (error) {
    console.error("Error fetching and sending data:", error);
  } finally {
    if (realm) {
      realm.close();
    }
  }
};

export { saveDataLocally, fetchLocalData,fetchAndSendData };
