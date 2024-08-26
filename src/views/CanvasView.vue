<template>
  <!-- <header>
    <img src="../assets/img/logo_1.png" alt="" class="logo navbar-brand">

  </header> -->
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
        v-bind="element.props" />
      </vue-draggable-resizable>

      <!-- <customization-menu
      :visible="menuVisible"
      :position="menuPosition"
      :elementStyles="selectedNoteStyles"
      @updateStyles="updateNoteStyles(selectedNoteIndex, $event)"
      ></customization-menu> -->
      
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import Note from '../components/NoteView.vue';
import ToDoList from '../components/ToDoList.vue';
import ImageComponent from '../components/ImageComponent.vue';
import HeaderView from '../components/HeaderView.vue';

export default {
  data(){
    return{
      userData:'',
      // menuVisible: false,
      // menuPosition: { top: 0, left: 0 },
      // selectedNoteIndex: null,
      // selectedNoteStyles: {}
    }
  },
  components: {
    VueDraggableResizable,
    Note,
    ToDoList,
    ImageComponent,
    HeaderView,

  },
  setup() {
    const state = reactive({
      elements: JSON.parse(localStorage.getItem('canvas-elements')) || []
    });

    const addElement = (type) => {
      const newElement = ({
        type: type,
        x: 50,
        y: 50,
        width: 500,
        height: 300,
        isActive: false,
        props: type === 'ToDoList'
          ? {
              title: 'My To-Do List',
              items: [{ text: 'Sample Task', done: false }]
            }
          : type === 'ImageComponent'
          ? { src: '', width: 200, height: 200 }
          : {
              text: 'New Note',
              fontSize: '16px',
              fontFamily: 'Arial',
              fontColor: '#000000',
              backgroundColor: '#ffffff'
            }
          
      });
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

    // const updateNoteStyles = ({index, newStyles}) => {
    //   this.notes[index].styles = { ...this.notes[index].styles, ...newStyles };
    //   this.menuVisible = false; // Hide the menu after applying the styles
    // };

    // const openCustomizationMenu = ({ id, styles, position }) => {
    //   this.selectedNoteIndex = id;
    //   this.selectedNoteStyles = styles;
    //   this.menuPosition = position;
    //   this.menuVisible = true;
    // };

    return {
      ...toRefs(state),
      addElement,
      resizeElement,
      dragElement,
      updateElementProps,
      clearCanvas,
      // openCustomizationMenu,
      // updateNoteStyles
    };
  },
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

.logo{
  width:7em;
}
</style>
