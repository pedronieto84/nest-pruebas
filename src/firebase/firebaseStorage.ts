import { getStorage, connectStorageEmulator, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebaseConfig";
import * as fs from 'fs';




// Connect to the Firestore Emulator
const storage = getStorage(app);
connectStorageEmulator(storage, "localhost", 9199);

// Function to upload a file to a specified path in the storage
async function uploadFile(filePath: string, destinationPath: string) {
    const fileBuffer = fs.readFileSync(filePath);
    const storageRef = ref(storage, destinationPath);
    console.log('storage ref', storageRef)
    await uploadBytes(storageRef, fileBuffer);
    console.log(`File uploaded to ${destinationPath}`);
}

export { storage, uploadFile };