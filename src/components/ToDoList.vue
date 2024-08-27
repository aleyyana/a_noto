<template>
  <div class="todo-list">
    <ul>
      <li
        v-for="(todoLists, index) in todoLists"
        :key="index"
        :class="{ completed: todoLists.completed }"
      >
        <input class=""
          type="checkbox"
          v-model="todoLists.completed"
          @change="handleComplete(index)"
        />
        <span>{{ todoLists.text }}</span>
      </li>
    </ul>
    <div class="input-container">
      <input class="addtodoLists"
        v-model="newtodoLists"
        @keyup.enter="addtodoLists"
        placeholder="Ajouter une to-do..."
      />
      <button class="addBtn" @click="addtodoLists">Ajouter</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { saveCanvasData, fetchCanvasData } from '../firebase/firebaseService'; // Import Firestore service functions

export default {
  setup() {
    const todoLists = ref([]);
    const newtodoLists = ref('');

    const loadtodoLists = async () => {
      try {
        const canvasData = await fetchCanvasData();
        
        // Access specific arrays within canvasData
        if (Array.isArray(canvasData.todoListss)) {
          todoLists.value = canvasData.todoLists;
        } else {
          console.error('canvasData.notes is not an array:', canvasData.todoLists);
        }
      } catch (error) {
        console.error('Error loading todoListss:', error);
      }
    };

    const addtodoLists = async () => {
      if (newtodoLists.value.trim()) {
        todoLists.value.push({ text: newtodoLists.value, completed: false });
        newtodoLists.value = '';
        await saveCanvasData([{ type: 'ToDoList', props: { todoListss: todoLists.value } }]); // Save canvas data to Firestore after adding an todoLists
      }
    };

    const handleComplete = async (index) => {
      setTimeout(async () => {
        todoLists.value.splice(index, 1);
        await saveCanvasData([{ type: 'ToDoList', props: { todoListss: todoLists.value } }]); // Save canvas data to Firestore after removing an todoLists
      }, 300);
    };

    onMounted(async () => {
      await loadtodoLists(); // Load todoListss from Firestore when the component is mounted
    });

    return {
      todoLists,
      newtodoLists,
      addtodoLists,
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

/* input{
    appearance: none;
    border:none;
    outline:none;
    background: none;

    display:block;
    width: 100%;
    max-width: 400px;
    margin:0 auto 1rem;
    font-size: rem;
    padding: 0.5 rem 0rem;
} */

.input-container input{
  appearance: none;
    border:none;
    outline:none;
    background: none;

    display:block;
    width: 100%;
    max-width: 400px;
    margin:0 auto 1rem;
    font-size: rem;
    padding: 0.5 rem 0rem;
}

.input-container input::placeholder{
    color:inherit;
}

.input-container input:not([type="submit"]){
  color: #e9d7c0;
    border-bottom: 2px solid #DAA390;
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
  color:#fff;
  font-family: Excon-Medium;
}

</style>
