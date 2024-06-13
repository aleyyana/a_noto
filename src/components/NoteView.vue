<template>
  <div class="note-container">
    <div class="note-content" :style="noteStyle">
      <textarea v-model="localProps.text" @input="updateProps"></textarea>
      <button @click="toggleMenu" class="customize-btn">Customize</button>
    </div>
    <CustomizationMenu
      v-if="menuVisible"
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      :props="localProps"
      @update-props="updateProps"
    />
  </div>
</template>

<script>
import CustomizationMenu from './CustomizationMenu.vue';

export default {
  props: ['props'],
  components: {
    CustomizationMenu
  },
  data() {
    return {
      localProps: { ...this.props },
      menuVisible: false,
      menuX: 0,
      menuY: 0
    };
  },
  computed: {
    noteStyle() {
      return {
        fontFamily: this.localProps.fontFamily,
        color: this.localProps.fontColor,
        backgroundColor: this.localProps.backgroundColor
      };
    }
  },
  methods: {
    updateProps(updatedProps) {
      this.localProps = { ...updatedProps };
      this.$emit('update-props', this.localProps);
    },
    toggleMenu(event) {
      this.menuVisible = !this.menuVisible;
      this.menuX = event.clientX;
      this.menuY = event.clientY;
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
.note-container {
  position: relative;
  border: 1px solid #ddd;
  background-color: #fff;
}

.note-content {
  padding: 10px;
}

textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
}

.customize-btn {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
