<template>
    <div>
      <!-- Button to create a new container -->
      <button @click="createNewContainer">Create New Container</button>
  
      <!-- Display all existing containers -->
      <div>
        <CustomizableContainer
          v-for="(container, index) in containers"
          :key="index"
          :width="container.width"
          :height="container.height"
          :x="container.x"
          :y="container.y"
          :backgroundColor="container.backgroundColor"
          :borderStyle="container.borderStyle"
          @delete-container="deleteContainer(index)"
        />
      </div>
    </div>
  </template>
  
  <script>
  import CustomizableContainer from "./CustomizableContainer.vue"; // Importing the customizable container component
  
  export default {
    components: {
      CustomizableContainer, // Registering the component
    },
    data() {
      return {
        containers: [], // List of containers
      };
    },
    methods: {
      createNewContainer() {
        const newContainer = {
          width: 200,
          height: 100,
          x: Math.random() * 400,
          y: Math.random() * 300,
          backgroundColor: "#ffffff",
          borderStyle: "1px solid #ccc",
        };
  
        this.containers.push(newContainer); // Add the new container to the list
      },
      deleteContainer(index) {
        this.containers.splice(index, 1); // Remove the container at the specified index
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  