
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Add a user to Firestore database:
exports.setupUsers = functions.auth.user().onCreate(async (user) => {
  var fullName = user.displayName || 'Anonymous';
  await admin.firestore().collection('users').doc(user.uid).set({//changing back to access profile link easily
  //await admin.firestore().collection('users').doc((user.email).split("@")[0]).set({
    fullName: fullName,
    username: (user.email).split("@")[0],
    email: user.email,
    civ_score: 5,
    propic: user.photoURL,
    id: user.uid,
    bio: ""
  });
});
