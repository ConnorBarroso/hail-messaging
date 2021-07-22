import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from './firebase/firebase-config';
import LoginLogout from './components/login-logout component/login-logout.component';
import Header from './components/header.component/header.component';
import Channel from './components/channel.component/channel.component';

import './App.css';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const auth = firebase.auth()

function App() {
  const [user, setUser] = useState(()=> auth.currentUser)
  const [initializing, setInitializing] = useState(true)

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user)
      }else{
        setUser(null)
      }
      if(initializing){
        setInitializing(false)
      }
    })

    return unsubscribe
  },[])

  const signInWithGoogle = async () =>{
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()

    try{
      await auth.signInWithPopup(provider)
    }catch(error){
      console.error(error)
      console.log('error here')
    }
  }

  
  if (initializing) return 'Just a moment...'
  return (
    
    <div className="App">
      <Header user={user}/>
        {
          user ? (
            null
          ) : (
            <div className='login-button-container'>
              <LoginLogout onClick = {signInWithGoogle} >Sign in with Google</LoginLogout>
            </div>
            
          )
        }
      {user ? (<Channel db={db} user={user}/>): null}
    </div>
  );
}

export default App;
