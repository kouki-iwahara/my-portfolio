import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyChIAauzlWc9EV6kidyW55v3Z7u1XCS1gw",
    authDomain: "nuxt-firebase-57e4b.firebaseapp.com",
    databaseURL: "https://nuxt-firebase-57e4b.firebaseio.com",
    projectId: "nuxt-firebase-57e4b",
    storageBucket: "nuxt-firebase-57e4b.appspot.com",
    messagingSenderId: "607808883297",
    appId: "1:607808883297:web:9aa350f2e699a151"
  })
}
export const db = firebase.firestore();
export default firebase