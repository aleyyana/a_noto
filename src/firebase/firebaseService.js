// firestoreService.js
import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveCanvasData = async (canvasData) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { canvasData });
      console.log('Canvas data saved successfully');
    } catch (error) {
      console.error('Error saving canvas data:', error);
    }
  } else {
    console.error('User not authenticated');
  }
};

export const fetchCanvasData = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return docSnap.data().canvasData;
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching canvas data:', error);
    }
  } else {
    console.error('User not authenticated');
  }
};
