// import { getApps, initializeApp } from 'firebase/app';
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { LogBox } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyAwOaaqk3EAfoChboHD2kgy0bOaS3x7ugI",
    authDomain: "garage-4a443.firebaseapp.com",
    projectId: "garage-4a443",
    storageBucket: "garage-4a443.appspot.com",
    messagingSenderId: "706773946814",
    appId: "1:706773946814:web:903783ad343173a143a9ef"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }
// initializeApp(firebaseConfig);

LogBox.ignoreLogs([`Setting a timer for a long period`]);

async function uploadImageAsync(uri) {
    console.log(uri)
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const fileRef = ref(getStorage(), uuid.v4());
      const result = await uploadBytes(fileRef, blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await getDownloadURL(fileRef);
}a