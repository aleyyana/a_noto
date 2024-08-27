const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateUserProfile = functions.https.onCall(async (data, context) => {
  const uid = context.auth.uid;
  const { username } = data;
  try {
    await admin.firestore().collection('users').doc(uid).set({ username });
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Unable to update profile.');
  }
});
