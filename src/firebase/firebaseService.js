import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Save canvas data to Firestore.
 * @param {Array} canvasData - The data to be saved.
 */
export const saveCanvasData = async (elements) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('User not authenticated');
    return;
  }

  if (!Array.isArray(elements)) {
    console.error('canvasData is not an array');
    return;
  }

  try {
    const sanitizedElements = elements.map(element => ({
      type: element.type || 'Unknown',
      x: element.x || 0,
      y: element.y || 0,
      width: element.width || 0,
      height: element.height || 0,
      props: element.props || {}
    }));

    console.log('Sanitized elements:', sanitizedElements);
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { canvasData: sanitizedElements }, { merge: true });
    console.log('Canvas data saved successfully');
  } catch (error) {
    console.error('Error saving canvas data:', error);
  }
};

/**
 * Fetch canvas data from Firestore.
 * @returns {Promise<Object>} - The fetched canvas data.
 */
export const fetchCanvasData = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User is not authenticated');
    return {};
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data().canvasData || {};
      const canvasData = Array.isArray(data?.canvasData) ? data.canvasData : [];
      console.log('Fetched canvas data:', canvasData);
      return{
        todoLists: Array.isArray(data.todoLists) ? data.todoLists : [],
        notes: Array.isArray(data.notes) ? data.notes : [],
        images: Array.isArray(data.images) ? data.images : [],
      } 

      ;
    } else {
      console.log('No document found!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching canvas data:', error);
    return [];
  }
};

/**
 * Initialize user canvas data in Firestore.
 */
export const initializeUserCanvasData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  try {
    const userId = user.uid;
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
