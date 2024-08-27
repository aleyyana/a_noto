import { db } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Save canvas data to Firestore
export const saveCanvasData = async (canvasData) => {
  try {
    const userId = 'currentUserId'; // Replace with actual user ID
    const docRef = doc(db, 'users', userId);

    // Ensure canvasData has the correct structure
    const sanitizedData = {
      notes: Array.isArray(canvasData.notes) ? canvasData.notes : [],
      todoLists: Array.isArray(canvasData.todoLists) ? canvasData.todoLists : [],
      images: Array.isArray(canvasData.images) ? canvasData.images : []
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
    const userId = ''; // Replace with actual user ID
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().canvasData;
      
      // Ensure canvasData is an object with arrays
      return {
        notes: Array.isArray(data?.notes) ? data.notes : [],
        todoLists: Array.isArray(data?.todoLists) ? data.todoLists : [],
        images: Array.isArray(data?.images) ? data.images : []
      };
    } else {
      console.log('No such document!');
      return { notes: [], todoLists: [], images: [] };
    }
  } catch (error) {
    console.error('Error fetching canvas data:', error);
    return { notes: [], todoLists: [], images: [] };
  }
};

export const initializeUserCanvasData = async () => {
  try {
    const userId = 'currentUserId'; // Replace with actual user ID
    const docRef = doc(db, 'users', userId);
    const initialData = {
      canvasData: {
        notes: [],
        todoLists: [],
        images: []
      }
    };
    await setDoc(docRef, initialData, { merge: true });
    console.log('Initialized user canvas data');
  } catch (error) {
    console.error('Error initializing canvas data:', error);
  }
};

