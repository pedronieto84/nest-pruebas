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
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp();
}

export const deleteAllUsers = onRequest(async (request, response) => {
    try {
        await deleteUsers();
        response.send("All users have been deleted successfully.");
    } catch (error) {
        logger.error("Error deleting users:", error);
        response.status(500).send("Error deleting users.");
    }
});

async function deleteUsers(nextPageToken?: string) {
    try {
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
    } catch (error) {
        logger.error("Error deleting users:", error);
        throw error;
    }
}
