import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp();
}

export const deleteAllUsers = onRequest(async (request, response) => {
    try {
        const users = await deleteUsers();
        response.send(users);
    } catch (error) {
        response.status(500).send("Error deleting users.");
    }
});

async function deleteUsers(nextPageToken?: string) {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const users = listUsersResult.users;
    const uids = users.map(user => user.uid);

    if (uids.length > 0) {
        await admin.auth().deleteUsers(uids);
        logger.info(`Successfully deleted ${uids.length} users`);
    }

    if (listUsersResult.pageToken) {
        await deleteUsers(listUsersResult.pageToken);
    }
    return listUsersResult;
}

// Function to delete all data from Firestore
export const deleteAllFirestoreData = onRequest(async (request, response) => {
    try {
        const collections = await admin.firestore().listCollections();
        for (const collection of collections) {
            await deleteCollection(admin.firestore(), collection.id);
        }
        response.send("All Firestore data has been deleted successfully.");
    } catch (error) {
        logger.error("Error deleting Firestore data:", error);
        response.status(500).send("Error deleting Firestore data.");
    }
});

async function deleteCollection(db: FirebaseFirestore.Firestore, collectionPath: string) {
    const collectionRef = db.collection(collectionPath);
    const querySnapshot = await collectionRef.get();
    const batch = db.batch();

    querySnapshot.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
}

// Function to delete all data from Storage
export const deleteAllStorageData = onRequest(async (request, response) => {
    try {
        await deleteAllFiles(admin.storage().bucket());
        response.send("All Storage data has been deleted successfully.");
    } catch (error) {
        logger.error("Error deleting Storage data:", error);
        response.status(500).send("Error deleting Storage data.");
    }
});

async function deleteAllFiles(bucket: any) {
    const [files] = await bucket.getFiles();
    const deletePromises = files.map((file: any) => file.delete());
    await Promise.all(deletePromises);
}
