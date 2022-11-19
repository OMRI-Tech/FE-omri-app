import { boot } from 'quasar/wrappers'
/**
 * Begin Firebase configuration
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getRedirectResult, FacebookAuthProvider } from "firebase/auth";
import { useStore } from 'vuex'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5FpbjOR0vbHiT9hKke4AYjrakZWWMK0c",
  authDomain: "entrenator-63b33.firebaseapp.com",
  projectId: "entrenator-63b33",
  storageBucket: "entrenator-63b33.appspot.com",
  messagingSenderId: "1072324376393",
  appId: "1:1072324376393:web:64e0fef5be8249c10d8c98",
  measurementId: "G-9D9DD7W8HM"
};

// Initialize Firebase
console.log('iniciamos boot firebase');
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);
const provider = new FacebookAuthProvider();
provider.addScope('email')
provider.addScope('public_profile')

console.log('salimos y exportamos ');

export { db, auth, provider };

/**
 * End Firebase configuration
 */

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
  console.warn('siiiiiiiiiiiiiiiiiii pasamos por aquiii')

  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
    console.log('user iniciado', user)
  } else {
    // No user is signed in.
    console.log('nada...', user)
  }
  const isAuthorized = true
  //const authF = getAuth();
  /*getRedirectResult(auth)
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      console.warn('resulto', result)
      if(result !== null) {
        const store = useStore()
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        alert('ok ok iniciamos sesion')
        console.log('infooo', credential, token, user)
        const objUser = {
          email: user.email,
          password: user.password
        }
        commit('SET_USER', auth.currentUser)
        redirect({ path: '/home' })
      }
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
      console.error('errorcito', error)
    });*/

  if (!isAuthorized && !urlPath.startsWith('/login')) {
    redirect({ path: '/login' })
    return
  }
})
