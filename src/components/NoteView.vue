<template>
  <div class="todo-list">
    <ul>
      <li
        v-for="(note, index) in notes"
        :key="index"
      >
        <span>{{ note.text }}</span>
      </li>
    </ul>
    <div class="input-container">
      <input class="input"
        v-model="newNote"
        @keyup.enter="addNote"
        placeholder="Ajouter une note"
      />
      <button v-on:click="isHidden = true"  class="addBtn" @click="addNote">Ajouter</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { saveCanvasData, fetchCanvasData } from '../firebase/firebaseService'; // Import Firestore service functions

export default {
  setup() {
    const notes= ref([]);
    const newNote = ref('');

    const loadItems = async () => {
      try {
        const canvasData = await fetchCanvasData();
        
        // Access specific arrays within canvasData
        if (Array.isArray(canvasData.notes)) {
          notes.value = canvasData.notes;
        } else {
          console.error('canvasData.notes is not an array:', canvasData.notes);
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };

    const addNote = async () => {
      if (notes.value.trim()) {
        notes.value.push({ text: notes.value, completed: false });
        newNote.value = '';
        await saveCanvasData([{ type: 'Note', props: { items: notes.value } }]); // Save canvas data to Firestore after adding an item
      }
    };

    const handleComplete = async (index) => {
      setTimeout(async () => {
        notes.value.splice(index, 1);
        await saveCanvasData([{ type: 'TNote', props: { items: notes.value } }]); // Save canvas data to Firestore after removing an item
      }, 300);
    };

    onMounted(async () => {
      await loadItems(); // Load items from Firestore when the component is mounted
    });

    return {
      notes,
      newNote,
      addNote,
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



.input-container {
  display: flex;
  align-items: center;
}

input{
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

input::placeholder{
    color:inherit;
}

input:not([type="submit"]){
    color: #e9d7c0;
    border-bottom: 2px solid #DAA390;
}

input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.addBtn {
  background-color: #DAA390;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  font-size: 12px;
  padding: 10px 24px;
  border: none;
  color:#fff;
  font-family: Excon-Medium;
}


</style>
