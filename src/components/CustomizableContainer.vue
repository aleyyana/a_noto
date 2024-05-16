<template>

    <label for="fontSelect">Select Font:</label>
    <select id="fontSelect" v-model="selectedFont">
      <option value="Moniqa">Custom Font 1</option>
      <option value="Excon-Regular">Custom Font 2</option>
    </select>

    <vue-draggable-resizable
      :w="width"
      :h="height"
      :x="x"
      :y="y"
      :minWidth="minWidth"
      :minHeight="minHeight"
      :maxWidth="maxWidth"
      :maxHeight="maxHeight"
    >
      <!-- Container Content -->
      <div
        class="container-content"
        :style="{ backgroundColor, border: borderStyle, color : selectedColor, font: selectedFont }"
      >
        <!-- Editable Content Area -->
        <textarea
          v-model="content"
          placeholder="Enter text here..."
          rows="4"
          cols="30"
        ></textarea>
      </div>
    </vue-draggable-resizable>
  </template>
  
  <script>
  import VueDraggableResizable from "vue-draggable-resizable"; // Importing the library
  
  export default {
    components: {
      VueDraggableResizable, // Registering the draggable and resizable component
    },
    data() {
      return {
        content: "", // Default content
        backgroundColor: "#ffffff", // Default background color (white)
        borderStyle: "1px solid #ccc", // Default border style
        selectedColor: "#000000",
        selectedFont: "Arial",
        width: 200, // Default width
        height: 100, // Default height
        x: 50, // Default x-coordinate
        y: 50, // Default y-coordinate
        minWidth: 100, // Minimum width
        minHeight: 50, // Minimum height
        maxWidth: 600, // Maximum width
        maxHeight: 400, // Maximum height
      };
    },
    methods: {
      changeBackgroundColor(color) {
        this.backgroundColor = color; // Method to change background color
      },
      changeBorderStyle(border) {
        this.borderStyle = border; // Method to change border style
      },
    },
  };
  </script>
  
  <style scoped>
  .container-content {
    padding: 10px;
  }
  
  textarea {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  