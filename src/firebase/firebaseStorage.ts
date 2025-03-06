import { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig";
import * as fs from 'fs';

// Connect to the Firestore Emulator
const storage = getStorage(app);
connectStorageEmulator(storage, "localhost", 9199);

// Function to upload a file to a specified path in the storage
async function uploadFile(filePath: string, destinationPath: string) {
    if (fs.lstatSync(filePath).isFile()) {
        const fileBuffer = fs.readFileSync(filePath);
        const storageRef = ref(storage, destinationPath);
        const res = await uploadBytes(storageRef, fileBuffer);
        // How to return the path of the uploaded file

        // Get the download URL
        //const downloadURL = await getDownloadURL(res.ref);
        return res.ref.fullPath
    } else {
        console.warn(`Skipping ${filePath} as it is not a file.`);
    }
}

export { storage, uploadFile };