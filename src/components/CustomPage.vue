<template>
    <div class="custom-page">
      <!-- Cover Section -->
        <div class="font-changer">
            <label for="fontSelect">Select Font:</label>
            <select id="fontSelect" v-model="selectedFont">
            <option value="Moniqa">Moniqa</option>
            <option value="Excon-Regular">Excon Excon-Regular</option>
            </select>
        </div>

        <div class="color-changer">
            <div class="controls">
 
            <label for="fontColor">Font Color:</label>
            <input type="color" id="fontColor" v-model="fontColor" />
        </div>

      </div>

      <div
        class="cover"
        :style="{ backgroundImage: 'url(' + coverImage + ')' }"
      >
        <!-- Page Title -->
        <input
          type="text"
          v-model="title"
          placeholder="Enter a title..."
          :style="{ fontFamily: selectedFont, color: fontColor }"
        />
  
        <!-- Icon Selection -->
        <select v-model="selectedIcon">
          <option v-for="icon in icons" :key="icon" :value="icon">
            {{ icon }}
          </option>
        </select>
        <span>{{ selectedIcon }}</span>
      </div>
  
      <!-- Content Section -->
      <div class="content" :style="{ backgroundColor: backgroundColor }">
        <textarea
          v-model="content"
          placeholder="Add some content here..." 
          :style="{ fontFamily: selectedFont, color:fontColor }"
        ></textarea>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: "",
        selectedFont: "Moniqa",
        fontColor: "#000000",
        selectedIcon: "⭐",
        icons: ["⭐", "❤️", "🌟", "😊", "🎉"],
        coverImage: "", // Placeholder cover image
        backgroundColor: "#f0f0f0",
        content: "",
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-page {
    padding: 20px;
  }
  
  .cover {
    height: 200px;
    background-size: cover;
    text-align: center;
    padding-top: 50px;
  }
  
  .content {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
  }
  
  input {
    border: none;
    font-size: 24px;
    text-align: center;
    width: 80%;
  }
  
  textarea {
    width: 100%;
    height: 200px;
    border: none;
  }
  </style>
  