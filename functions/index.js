/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
   logger.info("Incoming request", { structuredData: true });
 
   if (request.method === "POST") {
     const body = request.body;
     logger.info("Received POST body:", body);
 
     response.json({
       method: "POST",
       received: true,
       data: body,
     });
   } else if (request.method === "GET") {
     const name = request.query.name || "Anonymous";
     response.json({
       method: "GET",
       message: `Hello, ${name}!`,
     });
   } else {
     response.status(405).send("Method Not Allowed");
   }
 });