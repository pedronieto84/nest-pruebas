import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword } from "firebase/auth";

import { app } from "./firebaseConfig";

const auth = getAuth(app);

// Correct the URL scheme for the Auth Emulator
connectAuthEmulator(auth, "http://localhost:9099");

async function createFirebaseUser(email: string, password: string = '123456') {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error creating Firebase user:", error);
        throw error;
    }
}

export { auth, createFirebaseUser };
