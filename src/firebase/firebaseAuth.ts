import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import * as firebaseAdmin from 'firebase-admin'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"; // Ensure you have the correct Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

try {
    connectAuthEmulator(auth, "http://localhost:9099"); // Ensure the port matches the emulator configuration
} catch (error) {
    console.error("Error connecting to Firebase Auth emulator:", error);
}

async function createFirebaseUser(email: string, password:string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error creating Firebase user:", error);
        throw error;
    }
}

function signInWithEmailAndPasswordMethod( email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

function verifyFirebaseToken(firebaseToken: string) {
    const decodedUser = firebaseAdmin.auth().verifyIdToken(firebaseToken);
    
    // Generate a custom JWT with additional user roles
    //const payload = { uid: decodedUser.uid, email: decodedUser.email, role: 'user' };
    return { decodedUser};
  }

export { auth, createFirebaseUser, deleteUser, signInWithEmailAndPasswordMethod, verifyFirebaseToken };