<template>
  <div class="todo-list-container">
    <div class="todo-header">
      <input
        type="text"
        v-model="localProps.title"
        @input="updateProps"
        placeholder="To-Do List Title"
      />
    </div>
    <ul class="todo-list">
      <li v-for="(item, index) in localProps.items" :key="index">
        <input type="checkbox" v-model="item.done" @change="updateProps" />
        <input
          type="text"
          v-model="item.text"
          @input="updateProps"
          placeholder="New Task"
        />
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
      default: () => ({
        title: '',
        items: [],
      }),
    },
  },
  data() {
    return {
      localProps: {
        title: this.props?.title || '',
        items: this.props?.items || [], // Ensure `items` is always an array
      },
    };
  },
  methods: {
    updateProps() {
      this.$emit('update-props', this.localProps);
    },
    addItem() {
      this.localProps.items.push({ text: '', done: false }); // Add a new item
      this.updateProps(); // Emit the updated props
    },
    removeItem(index) {
      this.localProps.items.splice(index, 1); // Remove the item at the given index
      this.updateProps(); // Emit the updated props
    },
  },
  watch: {
    props: {
      handler(newProps) {
        this.localProps = {
          title: newProps?.title || '',
          items: newProps?.items || [], // Ensure `items` is always an array
        };
      },
      deep: true,
    },
  },
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
