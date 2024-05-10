<template>
    <div>
      <!-- Button to create a new page -->
      <button @click="createNewPage">Create New Page</button>
  
      <!-- Display list of custom pages -->
      <div v-for="(page, index) in pages" :key="index" class="page-summary">
        <h3>{{ page.title }}</h3>
        <button @click="editPage(index)">Edit Page</button>
      </div>
  
      <!-- Display the current custom page -->
      <CustomPage
        v-if="currentPage"
        :title="currentPage.title"
        :selectedFont="currentPage.selectedFont"
        :titleColor="currentPage.titleColor"
        :selectedIcon="currentPage.selectedIcon"
        :coverImage="currentPage.coverImage"
        :backgroundColor="currentPage.backgroundColor"
        :content="currentPage.content"
      />
    </div>
  </template>
  
  <script>
  import CustomPage from "./CustomPage.vue"; // Importing the custom page component
  
  export default {
    components: {
      CustomPage, // Registering the custom page component
    },
    data() {
      return {
        pages: [], // Array to store custom pages
        currentPage: null, // Reference to the current page being edited
      };
    },
    methods: {
      createNewPage() {
        const newPage = {
          title: "Untitled Page",
          selectedFont: "Moniqa",
          titleColor: "#000000",
          selectedIcon: "⭐",
          coverImage: "",
          backgroundColor: "#f0f0f0",
          content: "",
        };
  
        this.pages.push(newPage); // Add the new page to the list
        this.currentPage = newPage; // Set it as the current page
      },
      editPage(index) {
        this.currentPage = this.pages[index]; // Set the selected page as the current one
      },
    },
  };
  </script>
  
  <style scoped>
  .page-summary {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
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
  