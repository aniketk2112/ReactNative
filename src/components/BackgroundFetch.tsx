// import BackgroundFetch from "react-native-background-fetch";
// import NetInfo from "@react-native-community/netinfo";
// import { fetchAndSendData } from '../helpers/sqlHeelper';


// const myBackgroundTask = async () => {
//   // Check internet connection
//   const state = await NetInfo.fetch();
  
//   if (state.isConnected) {
//     // Fetch unsent data from local storage
//     fetchAndSendData()
//   }
// }

// // Configure the background task
// BackgroundFetch.configure({
//   minimumFetchInterval: 15,  // run every 15 minutes
// }, myBackgroundTask, (error) => {
//   console.log('[js] RNBackgroundFetch failed to start');
// });
