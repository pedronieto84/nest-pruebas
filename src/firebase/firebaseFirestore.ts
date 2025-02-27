
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {app } from "./firebaseConfig";


// 🔥 Connect to the Firestore Emulator
const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, "localhost", 8081); // Updated port to 8081

export {firestore}