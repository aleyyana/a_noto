<template>
  <div class="todo-list">
    <h2>To-Do List</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <input 
          type="text" 
          v-model="item.text" 
          placeholder="Enter to-do item" 
          @input="updateItem(index, item.text)" 
        />
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    // Initialize the list of items
    const items = ref([]);

    // Function to add a new item
    const addItem = () => {
      items.value.push({ text: '' });
    };

    // Function to update an item (optional, if needed)
    const updateItem = (index, text) => {
      items.value[index].text = text;
    };

    // Function to remove an item
    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    return {
      items,
      addItem,
      updateItem,
      removeItem,
    };
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: auto;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
input {
  flex-grow: 1;
  padding: 5px;
}
button {
  margin-left: 10px;
}
</style>
