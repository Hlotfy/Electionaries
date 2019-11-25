
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
    annote_counts: 0,
    id: user.uid
    // ,
    // bio: ""
  });
});

// exports.database.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   const snapshot = await admin.database().ref('/messages').push({original: original});
//   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//   res.redirect(303, snapshot.ref.toString());
// });

// function getArticle(url) {
//   var article;
//   fetch(url)
//     .then(response=> response.json().then(function(response){
//        console.log(response);
//        var text = response['response']['content']['fields']['body'];
//        article = stripHTML(text);
//       //  for (let i = 0; i < blurbs.length; i++) {
//       //   if (blurbs[i].trim()!='') {
//       //     linebreak = document.createElement("br");
//       //     newBlurb = document.createTextNode(blurbs[i]);
//       //     allNewsArticlesFromApi.appendChild(newBlurb);
//       //     allNewsArticlesFromApi.appendChild(linebreak);
//       //   }
//       //  }
//       return article;
//     }));
//     return article;
//   }


function stripHTML(html){
  // Create a new div element
  var parsed = html.replace(/<[^>]+>/g, '').split('\n');
  return parsed;
}

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });
