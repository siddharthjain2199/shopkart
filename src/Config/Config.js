import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAQUppjEHV7oCcpPlDcmrmWUCBBo-0A-0I",
    authDomain: "shopkart-b20c3.firebaseapp.com",
    projectId: "shopkart-b20c3",
    storageBucket: "shopkart-b20c3.appspot.com",
    messagingSenderId: "860930537296",
    appId: "1:860930537296:web:3edb02724e1f43e39c1e55",
    measurementId: "G-0PP67FKMBV"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();

  export {auth,fs,storage}