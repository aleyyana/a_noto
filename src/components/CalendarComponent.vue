<template>
    <div class="calendar-container">
      <v-calendar
        v-model="localSelectedDate"
        is-expanded
        :attributes="attrs"
      />
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import VCalendar from 'v-calendar';
  
  export default {
    components: {
      VCalendar,
    },
    props: {
      selectedDate: {
        type: Date,
        default: () => new Date(),
      },
    },
    setup(props, { emit }) {
      // Create a local copy of the prop to avoid direct mutation
      const localSelectedDate = ref(props.selectedDate);
  
      const attrs = ref([
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff9999',
          },
          dates: new Date(),
        },
      ]);
  
      // Watch for changes in the local copy and emit an event to update the parent
      watch(localSelectedDate, (newDate) => {
        emit('update-date', newDate);
      });
  
      return {
        localSelectedDate,
        attrs,
      };
    },
  };
  </script>
  
  <style scoped>
  .calendar-container {
    max-width: 400px;
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 10px;
  }
  </style>
  