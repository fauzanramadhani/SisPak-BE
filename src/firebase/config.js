const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();


module.exports = auth;
