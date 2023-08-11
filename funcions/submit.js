import SQLite from 'react-native-sqlite-storage';
import NetInfo from "@react-native-community/netinfo";


functions={}
const db = SQLite.openDatabase(
  {
    name: 'FormDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);


const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS FormData (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)",
      []
    );
  });
};

functions.saveData = (tec, sup) => {
  db.transaction((tx) => {
    tx.executeSql("INSERT INTO FormData (tecName, supName) VALUES (?, ?)", [tec, sup]);
    
});
};

functions.sendDataToAPI = async (data) => {
  // Logic to fetch data from SQLite and send to your API

};

createTable();

export default functions
