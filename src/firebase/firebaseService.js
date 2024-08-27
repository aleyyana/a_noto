import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Save canvas data to Firestore
export const saveCanvasData = async (canvasData) => {
  try {
    const userId = 'currentUserId'; // Replace with the actual user ID
    const docRef = doc(db, 'users', userId);

    // Sanitize data before saving
    const sanitizedData = {
      notes: canvasData.notes || [],
      todoLists: canvasData.todoLists || [],
      images: canvasData.images || []
    };

    await setDoc(docRef, { canvasData: sanitizedData });
    console.log('Canvas data saved successfully');
  } catch (error) {
    console.error('Error saving canvas data:', error);
  }
};

// Fetch canvas data from Firestore
export const fetchCanvasData = async () => {
  try {
    const userId = 'currentUserId'; // Replace with the actual user ID
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().canvasData || { notes: [], todoLists: [], images: [] };
    } else {
      console.log('No such document!');
      return { notes: [], todoLists: [], images: [] };
    }
  } catch (error) {
    console.error('Error fetching canvas data:', error);
    return { notes: [], todoLists: [], images: [] };
  }
};
