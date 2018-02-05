import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDKiSefp7fBR_LoGbwgdo_h2A9A0l8PziA',
  authDomain: 'game-app-71bd0.firebaseapp.com',
  databaseURL: 'https://game-app-71bd0.firebaseio.com',
  projectId: 'game-app-71bd0',
  storageBucket: '',
  messagingSenderId: '581815700752'
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const BGG_URL = 'https://www.boardgamegeek.com/xmlapi2/'
