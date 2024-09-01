<template>
  <vue-draggable-resizable :x="100" :y="100" :w="200" :h="150">
    <div class="note">
      <textarea v-model="content" placeholder="Write your note..."></textarea>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      content: '',
    };
  },
};
</script>

<style scoped>
.note {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10px;
  background-color: #E9D7C0;
  border: 1px solid #DAA38F;
  border-radius: 4px;
}

textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  background: transparent;
  font-size: 14px;
  outline: none;
}
</style>
