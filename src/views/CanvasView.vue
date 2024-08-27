<template>
  <HeaderView/>
  <div class="canvas-container">
    <div class="sidebar">
      <router-link class="nav-item nav-link" to="/profile">Profil</router-link>
      <button @click="addElement('Note')" class="fxbtn text-center">Créer une Note</button>
      <button @click="addElement('ToDoList')" class="fxbtn text-center">Nouvelle To-Do List</button>
      <button @click="addElement('ImageComponent')" class="fxbtn text-center">Ajouter une image</button>
      <button @click="clearCanvas" class="clearbtn text-center">Vider le canvas</button>
    </div>
    <div class="canvas dot-grid">
      <vue-draggable-resizable
        v-for="(element, index) in elements"
        :key="index"
        :w="element.width"
        :h="element.height"
        :x="element.x"
        :y="element.y"
        @resizing="resizeElement($event, index)"
        @dragging="dragElement($event, index)"
      >
        <component 
          :is="element.type" 
          v-bind="element.props" 
          @update-props="updateElementProps(index, $event)"
        />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import Note from '../components/NoteView.vue';
import ToDoList from '../components/ToDoList.vue';
import ImageComponent from '../components/ImageComponent.vue';
import HeaderView from '../components/HeaderView.vue';
import { db, auth } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default {
  components: {
    VueDraggableResizable,
    Note,
    ToDoList,
    ImageComponent,
    HeaderView,
  },
  setup() {
    const state = reactive({
      elements: []
    });

    const sanitizeElements = (elements) => {
      return elements.map(element => {
        // Ensure that all required fields are present and initialized
        if (!element) return null;
        return {
          ...element,
          props: element.props || {} // Ensure props is always an object
        };
      }).filter(element => element !== null); // Remove any null elements
    };

    const addElement = async (type) => {
      const newElement = {
        type: type,
        x: 50,
        y: 50,
        width: 500,
        height: 300,
        props: type === 'ToDoList'
          ? {
              title: 'My To-Do List',
              items: [{ text: 'Sample Task', done: false }]
            }
          : type === 'ImageComponent'
          ? { src: '', width: 200, height: 200 }
          : {
              text: '',
              fontSize: '16px',
              fontFamily: 'Arial',
              fontColor: '#000000',
              backgroundColor: '#ffffff'
            }
      };

      state.elements.push(newElement);
      await saveElements(); // Save after adding
    };

    const resizeElement = async (event, index) => {
      state.elements[index].width = event.width;
      state.elements[index].height = event.height;
      await saveElements();
    };

    const dragElement = async (event, index) => {
      state.elements[index].x = event.left;
      state.elements[index].y = event.top;
      await saveElements();
    };

    const updateElementProps = async (index, updatedProps) => {
      state.elements[index].props = { ...updatedProps };
      await saveElements();
    };

    const clearCanvas = async () => {
      state.elements = []; // Clear the array
      await saveElements();
    };

    const saveElements = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const sanitizedElements = sanitizeElements(state.elements); // Sanitize data
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, { canvasData: sanitizedElements });
          console.log('Canvas data saved successfully');
        } catch (error) {
          console.error('Error saving canvas data:', error);
        }
      } else {
        console.error('User not authenticated');
      }
    };

    const fetchElements = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            state.elements = docSnap.data().canvasData || []; // Initialize to an empty array if no data
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

    onMounted(() => {
      fetchElements(); // Load data when the component is mounted
    });

    return {
      ...toRefs(state),
      addElement,
      resizeElement,
      dragElement,
      updateElementProps,
      clearCanvas,
    };
  },
};

</script>

<style scoped>
/* Your styles here */
</style>
