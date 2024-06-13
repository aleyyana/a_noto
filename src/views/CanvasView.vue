<template>
  <div class="canvas-container">
    <div class="sidebar">
      <button @click="addElement('NoteView')">Add Note</button>
      <button @click="addElement('ImgComponent')">Add Image</button>
      <button @click="clearCanvas">Clear Canvas</button>
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
import NoteView from '../components/NoteView.vue';
import ImgComponent from '../components/ImgComponent.vue';

export default {
  components: {
    VueDraggableResizable,
    NoteView,
    ImgComponent,
  },
  setup() {
    const state = reactive({
      elements: JSON.parse(localStorage.getItem('canvas-elements')) || [],
    });

    const addElement = (type) => {
      const newElement = {
        type: type,
        x: 50,
        y: 50,
        width: type === 'ImageComponent' ? 200 : 200,
        height: type === 'ImageComponent' ? 200 : 100,
        props: type === 'ImageComponent'
          ? { src: '', width: 200, height: 200 }
          : { text: 'New Note', fontSize: 16, fontColor: '#000000', backgroundColor: '#ffffff' },
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
      clearCanvas,
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
  background-color: #f0f0f0;
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
</style>
