<template>
  <div class="note">
    <textarea v-model="noteContent" @blur="saveContent"></textarea>
  </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
  props: {
    initialContent: {
      type: String,
      default: ''
    },
    index: Number,
    onUpdate: Function
  },
  setup(props) {
    const noteContent = ref(props.initialContent);

    const saveContent = () => {
      if (props.index !== undefined) {
        // Emit an event to update the note content in the parent component
        props.onUpdate(props.index, { content: noteContent.value });
      }
    };

    watch(noteContent, saveContent); // Save content on change

    onMounted(() => {
      noteContent.value = props.initialContent;
    });

    return {
      noteContent,
      saveContent
    };
  }
});
</script>

<style scoped>
.note {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: ##e9d7c0;
}
textarea {
  width: 100%;
  height: 100px;
  border: none;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
  padding: 10px;
}
</style>
