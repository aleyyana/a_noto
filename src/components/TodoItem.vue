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

    .btn{
    padding: 10px;
    width: 100px;
    background-color: #f1b598;
    border-radius: 0.5rem;
    }
  </style>