<template>
  <header>
    <img src="../assets/img/logo_1.png" alt="">

  </header>
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
        <component :is="element.type" v-bind="element.props" @update-props="updateElementProps(index, $event)" />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import Note from '../components/NoteView.vue';
import ToDoList from '../components/ToDoList.vue';
import ImageComponent from '../components/ImageComponent.vue';
// import { ref, set } from 'firebase/database';
// import { database, auth } from '../firebase/firebaseConfig';


export default {
  data(){
    return{
      userData:''
    }
  },
  // methods:{
  //   async saveData(){
  //     if (auth.currentUser){
  //     const userId = auth.currentUser.uid;
  //     try {
  //       await set(ref(database, 'users/ +userId'),{
  //         data: this.userData,
  //       });
  //       }catch (error){
  //       console.erroe(error.message)
  //       }
  //     }
  //   }
  // },
  components: {
    VueDraggableResizable,
    Note,
    ToDoList,
    ImageComponent,
  },
  setup() {
    const state = reactive({
      elements: JSON.parse(localStorage.getItem('canvas-elements')) || []
    });

    const addElement = (type) => {
      const newElement = {
        type: type,
        x: 50,
        y: 50,
        width: 200,
        height: 150,
        props: type === 'ToDoList'
          ? {
              title: 'My To-Do List',
              items: [{ text: 'Sample Task', done: false }]
            }
          : type === 'ImageComponent'
          ? { src: '', width: 200, height: 200 }
          : {
              text: 'New Note',
              fontSize: 16,
              fontFamily: 'Arial',
              fontColor: '#000000',
              backgroundColor: '#ffffff'
            }
          
      };
      state.elements.push(newElement);
      saveElements();
    };

    const resizeElement = (event, index) => {
      state.elements[index].width = event.width;
      state.elements[index].height = event.height;
      saveElements();
    };

    const dragElement = (event, index) => {
      state.elements[index].x = event.left;
      state.elements[index].y = event.top;
      saveElements();
    };

    const updateElementProps = (index, updatedProps) => {
      state.elements[index].props = { ...updatedProps };
      saveElements();
    };

    const clearCanvas = () => {
      state.elements.splice(0, state.elements.length); // Clear the elements array
      saveElements(); // Update the local storage
    };

    const saveElements = () => {
      localStorage.setItem('canvas-elements', JSON.stringify(state.elements));
    };

    return {
      ...toRefs(state),
      addElement,
      resizeElement,
      dragElement,
      updateElementProps,
      clearCanvas
    };
  }
};
</script>

<style scoped>
.canvas-container {
  display: flex;
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
}
.dot-grid {
  background-color: #ffffff;
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
  background-size: 20px 20px;
}

.fxbtn{
  background-color: #E9D7C0;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  border: none;
  margin:auto;
}

.clearbtn{
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  border: 3px solid #E9D7C0;
  background-color: #ffffff;
}
</style>
