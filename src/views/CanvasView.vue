<template>
    <main>

        <section class="header">
            <h1 class="text-center"> Your Bullet Time</h1>
        </section>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <h4 class="text-center">Calendrier</h4>
                        <v-date-picker 
                        mode="date" v-model="date" 
                        v-model.range="range" 
                        show-weeknumbers="right"
                        :rows="2" 
                        :timezone="timezone"
                        />
                    </div>
                    <div class="col">
                            <h4 class="text-center">Tâches à faire </h4>
                            <div>
                                <form v-on:submit.prevent="addNewTodo">
                                <input
                                    type="text"
                                    v-model="newTodoText"
                                    id="new-todo"
                                    placeholder="E.g. Feed the cat"
                                />
                                <button>Add</button>
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
                    <div class="col">
                        <h5 class="text-center">Notes importantes</h5>
                            <form v-on:submit.prevent="addNewTodo">
                                <input
                                    type="text"
                                    v-model="newTodoText"
                                    id="new-todo"
                                    placeholder="E.g. Feed the cat"
                                />
                                <button>Add</button>
                            </form>
                    </div>    
                </div>
            </div>
        </section>

        
    </main>
    
</template>

<script>

import TodoItemVue from "../components/TodoItem.vue";
import { mapGetters, mapState, mapActions } from 'vuex';

export default{
    setup(){
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
                title: "Do the dishes",
                },
                {
                id: 2,
                title: "Take out the trash",
                },
                {
                id: 3,
                title: "Mow the lawn",
                },
            ],
            nextTodoId: 4,
            newNote: ""
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
        addNewNote() {
        this.newNote.push({
        id: this.nextNewNote++,
        title: this.newNote,
        });
        this.newNote = "";
        },
        ...mapActions('journal', ['addDay'])
    },
    computed: {
    ...mapState({
      //checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('journal', {
      days: 'journalDays'
    })
  },
}

</script>
<style>

</style>