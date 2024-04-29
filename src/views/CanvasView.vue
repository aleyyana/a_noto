<template>
    <main>

        <section class="header">
            <h1 class="text-center"> Your Bullet Time</h1>
        </section>

        <section class="content">
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

            <div class="container">
                <div class="row">
                    <div class="col">
                        <h4 :style="{ fontFamily: selectedFont, color: fontColor }" class="text-center">Calendrier</h4>
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
                                <todo-item :style="{ fontFamily: selectedFont, color: fontColor }" 
                                    v-for="(todo, index) in todos"
                                    :key="todo.id"
                                    :title="todo.title"
                                    @remove="todos.splice(index, 1)"
                                ></todo-item>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </section>

        
    </main>
    
</template>

<script>

import TodoItemVue from "../components/TodoItem.vue";
import { ref } from 'vue';


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
            selectedFont: 'Excon',
            fontColor: "#000000", // Default font color (black)
            backgroundColor: "#ffffff", // Default background color (white)
        };
    },
    methods: {
        addNewTodo() {
        this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
        });
        this.newTodoText = "";
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