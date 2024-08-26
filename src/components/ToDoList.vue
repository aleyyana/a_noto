<template>
  <div class="todo-list">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ completed: item.completed }"
      >
        <input
          type="checkbox"
          v-model="item.completed"
          @change="handleComplete(index)"
        />
        <span>{{ item.text }}</span>
      </li>
    </ul>
    <div class="input-container">
      <input
        v-model="newItem"
        @keyup.enter="addItem"
        placeholder="Ajouter une to-do..."
      />
      <button class="addBtn" @click="addItem">Add</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const items = ref([]);
    const newItem = ref('');

    const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push({ text: newItem.value, completed: false });
        newItem.value = '';
      }
    };

    const handleComplete = (index) => {
      // Mark as completed and remove the item after a brief delay
      setTimeout(() => {
        items.value.splice(index, 1);
      }, 300);
    };

    return {
      items,
      newItem,
      addItem,
      handleComplete,
    };
  },
};
</script>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #fff;
  border-radius: 3px;
  transition: opacity 0.3s ease;
}

.completed {
  opacity: 0.5;
  text-decoration: line-through;
}

.input-container {
  display: flex;
  align-items: center;
}

input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

button {
  background-color: #DAA390;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 14px;
  padding: 10px 24px;
  border: none;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
