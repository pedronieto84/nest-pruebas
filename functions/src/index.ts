/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

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
        // const users = listUsersResult.users;
        // const uids = users.map(user => user.uid);

        // if (uids.length > 0) {
        //     await admin.auth().deleteUsers(uids);
        //     logger.info(`Successfully deleted ${uids.length} users`);
        // }

        // if (listUsersResult.pageToken) {
        //     await deleteUsers(listUsersResult.pageToken);
        // }
        return listUsersResult;
 
}
