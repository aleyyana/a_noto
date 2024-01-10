<template>
  <div class="to-do">
    <li>
      {{ title }}
      <button class="btn" @click="$emit('remove')">Remove</button>
    </li>
  </div>  
  </template>
  
  <script>
  export default {
    name: "TodoItem",
    props: ["title"],
    emits: ["remove"],
  };
  </script>

  <style scoped>
    li{
      list-style:georgian;
    }
  </style>