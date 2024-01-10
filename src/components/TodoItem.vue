<template>
    <li>
      {{ title }}
      <button class="btn" @click="$emit('remove')">Remove</button>
    </li>
  </template>
  
  <script>
  export default {
    name: "TodoItem",
    props: ["title"],
    emits: ["remove"],
  };
  </script>