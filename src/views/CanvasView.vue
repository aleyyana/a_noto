<template>
  <div class="canvas-container">
    <div class="sidebar">
      <button @click="addElement('NoteView')">Add Note</button>
      <button @click="addElement('ImgComponent')">Add Image</button>
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
        <component :is="element.type" :props="element.props" @update-props="updateElementProps(index, $event)" />
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';
import NoteView from '../components/NoteView.vue';
import ImgComponent from '../components/ImgComponent.vue'

export default {
  components: {
    VueDraggableResizable,
    NoteView,
    ImgComponent
  },
  data() {
    return {
      elements: JSON.parse(localStorage.getItem('canvas-elements')) || [], // Load from local storage
    };
  },
  methods: {
    addElement(type) {
      const newElement = {
        type: 'Note',
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        props: {
          text: 'New Note',
          fontSize: 16,
          fontColor: '#000000',
          backgroundColor: '#ffffff',
        },
      };
      this.elements.push(newElement);
      this.saveElements();
    },
    resizeElement(event, index) {
      this.elements[index].width = event.width;
      this.elements[index].height = event.height;
      this.saveElements();
    },
    dragElement(event, index) {
      this.elements[index].x = event.left;
      this.elements[index].y = event.top;
      this.saveElements();
    },
    updateElementProps(index, updatedProps) {
      this.$set(this.elements, index, {
        ...this.elements[index],
        props: updatedProps,
      });
      this.saveElements();
    },
    saveElements() {
      localStorage.setItem('canvas-elements', JSON.stringify(this.elements));
    },
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
  background-color: #ffffff; /* Set the base background color */
  background-image: radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px);
  background-size: 20px 20px; /* Adjust the size of the grid */
}
</style>
