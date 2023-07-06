import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Boot from './src/boot';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen'

OneSignal.setAppId("54d34777-ae9d-4361-b936-126b7e8b5f31");

OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log({ notificationReceivedEvent })
  let notification = notificationReceivedEvent.getNotification();
  notificationReceivedEvent.complete(notification);
});

OneSignal.setNotificationOpenedHandler(notification => console.log("OneSignal: notification opened:", notification));

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"#e30224"}
      />
      <Boot />
      <Toast />
    </>
  );
};

export default App;
