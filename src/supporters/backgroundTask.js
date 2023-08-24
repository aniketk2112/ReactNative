import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import BackgroundActions from 'react-native-background-actions';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const taskRandom = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
  
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundActions.isRunning(); i++) {
            console.log(i);
            await sleep(delay);
        }
    });
};

const App = () => {
  const [isRunning, setIsRunning] = useState(false);

  const options = {
    taskName: 'ExampleTaskName',
    taskTitle: 'Background Task',
    taskDesc: 'Running in background...',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // (optional)
    parameters: {
      delay: 1000,
    },
  };

  const toggleBackground = async () => {
    if (isRunning) {
      console.log('stop background service');
      await BackgroundActions.stop();
      setIsRunning(false);
    } else {
      console.log('start background service....');
      BackgroundActions.start(taskRandom, options)
      .then(() => console.log("Started background task"))
        .catch((err) => console.error("Error starting background task:", err));
      setIsRunning(true);
    }
  };



  useEffect(() => {
    return () => {
      if (isRunning) {
        console.log('stop background service');
        BackgroundActions.stop(); // Stops the background task
      }
    };
  }, [isRunning]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isRunning ? 'Background task is running...' : 'Background task is stopped'}</Text>
      <Button onPress={toggleBackground} title={isRunning ? 'Stop Background Task' : 'Start Background Task'} />
    </View>
  );
};

export default App;
