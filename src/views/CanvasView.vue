<template>
  <HeaderView/>
  <div class="blank-space"></div>
  <div class="canvas-container">
    <div class="sidebar">
      <!-- <router-link class="nav-item nav-link" to="/profile">Profil</router-link> -->
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
import { db, auth } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default {
  components: {
    VueDraggableResizable,
    Note,
    ToDoList,
    ImageComponent,

  },
  setup() {
    const state = reactive({
      elements: []
    });


    const addElement = async (type) => {
      const newElement = {
        type: type,
        x: 50,
        y: 50,
        width: 350,
        height: 'auto',
        props: type === 'ToDoList'
          ? {
              title: 'My To-Do List',
              items: [{ text: 'Sample Task', done: false }]
            }
          : type === 'ImageComponent'
          ? { src: '', width: 200, height: 200 }
          : {
            items: [{ text: 'Sample Task', done: false }]
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
              const sanitizedElements = state.elements.map(element => {
            // Ensure all required fields are present and initialized
            return {
              type: element.type || 'Unknown',
              x: element.x || 0,
              y: element.y || 0,
              width: element.width || 0,
              height: element.height || 0,
              props: element.props || {}
            };
          }); // Sanitize data

          console.log('Sanitized elements:', sanitizedElements);
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, { canvasData: sanitizedElements }, {merge: true});
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
.canvas-container {
  display: flex;
}

.blank-space{
  height:50px;
}
.sidebar {
  width: 200px;
  background-color: #ffffff;
  padding: 10px;
}
.canvas {
  flex-grow: 1;
  position: relative;
  background-color: #ffffff;
  border: 1px solid #ddd;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}

.dot-grid {
  background-color: #ffffff;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
  background-size: 20px 20px;
}

.fxbtn{
  background-color: #E9D7C0;
  color:#ffffff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  border: none;
  margin:auto;
  font-family: Excon-Medium;
}

.clearbtn{
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  color:#E9D7C0;
  border: 3px solid #E9D7C0;
  background-color: #ffffff;
  font-family: Excon-Medium;
}

.logo{
  width:7em;
}
</style>
