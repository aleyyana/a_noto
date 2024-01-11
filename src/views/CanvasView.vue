<template>
    <main>

        <section class="header">
            <h1 class="text-center"> Your Bullet Time</h1>
        </section>

        <section class="content">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h4 class="text-center">Calendrier</h4>
                        <v-date-picker 
                        mode="date" v-model="date" 
                        v-model.range="range" 
                        show-weeknumbers="right"
                        :rows="2" 
                        :timezone="timezone"
                        :value="null"
                        color="purple"
                        is-range />
                    </div>
                    <div class="col mx-auto">
                            <h4 class="text-center">Tâches à faire </h4>
                            <VDatePicker v-model="date" mode="time" />
                            <div>
                                <form v-on:submit.prevent="addNewTodo">
                                <input
                                    type="text"
                                    v-model="newTodoText"
                                    id="new-todo"
                                    placeholder="E.g. Feed the cat"
                                />
                                <button class="btn"> Ajouter </button>
                                </form>
                                <ul>
                                <todo-item
                                    v-for="(todo, index) in todos"
                                    :key="todo.id"
                                    :title="todo.title"
                                    @remove="todos.splice(index, 1)"
                                ></todo-item>
                                </ul>
                            </div>
                    </div>
                    <!-- <div class="col">

                        <div v-if="showModal" class="overlay">
                        <div class="modal">
                            <textarea v-model.trim="newNote" name="note" id="note" cols="30" rows="10"></textarea>
                            <p v-if="errorMessage">{{ errorMessage }}</p>
                            <button @click="addNote">Add Note</button>
                            <button class="cancel" @click="showModal = false">Cancel</button>
                        </div>
                        </div>

                        <h5 class="text-center">Notes importantes</h5>
                        <button class="btn" id="show-modal" @click="showModal = true">+</button>
                        <div class="cards-container">
                            <div
                            v-for="note in notes"
                            :key="note.id" 
                            class="card"
                            :style="{backgroundColor: note.backgroundColor}"
                            >
                            <p class="main-text">{{ note.text }}</p>
                            </div>
                        </div>
                    </div>     -->
                </div>
            </div>
        </section>

        
    </main>
    
</template>

<script>

import TodoItemVue from "../components/TodoItem.vue";
import { ref } from 'vue';

const showModal = ref(false);
const newNote = ref({});
const errorMessage = ref({});
const notes = ref({});

export default{
    setup(){
        const date = ref(new Date());
        return{
            date
        }
    },
    components:{
        TodoItem: TodoItemVue,
    },
    data() {
        return {
            newTodoText: "",
            todos: [
                {
                id: 1,
                title: "Faire la vaisselle",
                },
            ],
            nextTodoId: 2,
            newNote: "",
            showModal: false,
        };
    },
    methods: {
        addNewTodo() {
        this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
        });
        this.newTodoText = "";
        },
        addNote(){
            if(newNote.value.length < 10) {
            return errorMessage.value = "Note must be at least 10 characters long!";
            }

            notes.value.push({
            id: Math.floor(Math.random() * 1000000),
            text: newNote.value,
            date: new Date(),
            });
            showModal.value = false;
            newNote.value = "";
            errorMessage.value = "";
        }
    },
    computed:{
        notes(){
            return this.$store.state.string
        }
    }
}


</script>
<style scoped>

.btn{
    padding: 10px;
    width: 100px;
    background-color: #f1b598;
    border-radius: 0.5rem;
}

form{
    display: flex;
    flex: 1 1 0%;
    padding: 1rem;
}

input{
    appearance: none;
    border: none; 
    outline:none;
    background: none;

    font-size: 1rem;
}

form input[type="text"]{
    color:#f1b598;
    border-bottom: 2px solid #f1b598;
}

</style>