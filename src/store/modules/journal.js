import { uuid } from "vue-uuid";

// initial state
// shape: [{ id, text }]
const state = {
  days: []
};

const getters = {
  journalDays: (state) => {
    return state.days;
  }
};

const actions = {
  addDay(context) {
    context.commit("addDay");
  },
  updateDay(context, data) {
    context.commit("updateDay", data);
  }
};

const mutations = {
  addDay() {
    state.days = [
      ...state.days,
      {
        id: uuid.v4(),
        text: Date().toString()
      }
    ];
  },
  updateDay(state, day) {
    let dayIndex = state.days.findIndex(e => e.id === day.id);
    state.days[dayIndex] = day;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
