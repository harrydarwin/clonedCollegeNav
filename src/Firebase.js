
import firebase from 'firebase/app';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCx_22IVNfxHM8TyjNoRqbqbf30j2flMgU",
    authDomain: "collegenavigator-40c76.firebaseapp.com",
    projectId: "collegenavigator-40c76",
    storageBucket: "collegenavigator-40c76.appspot.com",
    messagingSenderId: "497329332909",
    appId: "1:497329332909:web:c15591a2de202a9fe99c24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;