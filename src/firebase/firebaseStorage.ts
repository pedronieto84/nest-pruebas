import { getStorage, connectStorageEmulator } from "firebase/storage";
import { app } from "./firebaseConfig";
import * as fs from 'fs';
import * as path from 'path';

// Read the storage port from the configuration file
const portConfigPath = path.join(__dirname, '../../storagePortConfig.json');
const portConfig = JSON.parse(fs.readFileSync(portConfigPath, 'utf8'));
const storagePort = portConfig.storagePort;

// Connect to the Firestore Emulator
const firestore = getStorage(app);
connectStorageEmulator(firestore, "localhost", storagePort);

export { firestore };