import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"; // Ensure you have the correct Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

try {
    connectAuthEmulator(auth, "http://localhost:9099"); // Ensure the port matches the emulator configuration
} catch (error) {
    console.error("Error connecting to Firebase Auth emulator:", error);
}

async function createFirebaseUser(email: string, password: string = "123456") {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error creating Firebase user:", error);
        throw error;
    }
}

export { auth, createFirebaseUser, deleteUser, signInWithEmailAndPassword };