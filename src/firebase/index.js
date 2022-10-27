import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDS-JSFMZlfK49fBQyOfH-q-9trg6oz3FA",
    authDomain: "discord-clone-f558e.firebaseapp.com",
    projectId: "discord-clone-f558e",
    storageBucket: "discord-clone-f558e.appspot.com",
    messagingSenderId: "971136280298",
    appId: "1:971136280298:web:e1d706c983a06fd6e89993"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
    db
}