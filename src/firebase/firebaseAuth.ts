import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import * as firebaseAdmin from 'firebase-admin'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"; // Ensure you have the correct Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// No es lo mismo el firebase admin, que el in
const adminApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || "worktocloud3",
});

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

async function verifyFirebaseToken(firebaseToken: string) {
    try{
             // Check if the Firebase Auth Emulator is being used
             console.log(process.env);
             if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
                // Decode the token without verification (for emulator use only)
                const decodedUser = JSON.parse(
                    Buffer.from(firebaseToken.split('.')[1], 'base64').toString('utf-8')
                );
                return { decodedUser };
            }
    
            // For production, verify the token using the Admin SDK
            const decodedUser = await adminApp.auth().verifyIdToken(firebaseToken);

    }catch(error){
        throw error;
    }
  }

export { auth, createFirebaseUser, deleteUser, signInWithEmailAndPasswordMethod, verifyFirebaseToken };