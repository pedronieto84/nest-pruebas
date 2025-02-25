import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json'; // Ensure you have the service account key file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://<your-database-name>.firebaseio.com' // Replace with your database URL
});

export const auth = admin.auth();
