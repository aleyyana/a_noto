<template>
  <div class="todo-list-container">
    <div class="todo-header">
      <input type="text" v-model="localProps.title" @input="updateProps" placeholder="To-Do List Title" />
    </div>
    <ul class="todo-list">
      <li v-for="(item, index) in localProps.items" :key="index">
        <input type="checkbox" v-model="item.done" />
        <input type="text" v-model="item.text" @input="updateProps" />
        <button @click="removeItem(index)">X</button>
      </li>
    </ul>
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script>
export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localProps: { ...this.props }
    };
  },
  methods: {
    updateProps() {
      this.$emit('update-props', this.localProps);
    },
    addItem() {
      this.localProps.items.push({ text: '', done: false });
      this.updateProps();
    },
    removeItem(index) {
      this.localProps.items.splice(index, 1);
      this.updateProps();
    }
  },
  watch: {
    props: {
      handler(newProps) {
        this.localProps = { ...newProps };
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.todo-list-container {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #fff;
}
.todo-header input {
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
}
.todo-list {
  list-style: none;
  padding: 0;
}
.todo-list li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.todo-list li input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
}
.todo-list li button {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
