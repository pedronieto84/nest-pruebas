import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your Firebase config (same as production, emulator doesn't change this)
const firebaseConfig = {
    apiKey: "AIzaSyCjyOZEmNFaHvLyfI2o1z0Sm6-4Ewnninw",
    authDomain: "worktocloud3.firebaseapp.com",
    databaseURL: "https://worktocloud3.firebaseio.com",
    projectId: "worktocloud3",
    storageBucket: "worktocloud3.appspot.com",
    messagingSenderId: "86490424552",
    appId: "1:86490424552:web:515edc8fadf113d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// 🔥 Connect to the Firebase Auth Emulator
connectAuthEmulator(auth, "http://localhost:9099");

// 🔥 Connect to the Firestore Emulator
connectFirestoreEmulator(firestore, "localhost", 8081); // Updated port to 8081

async function createFirebaseUser(email: string, password: string = '123456') {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error creating Firebase user:", error);
        throw error;
    }
}

export { auth, firestore, createFirebaseUser };
