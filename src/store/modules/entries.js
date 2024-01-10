import { uuid } from "vue-uuid";

// initial state
// shape: [{ id, text }]
const state = {
  entries: []
};

const getters = {
  dayEntries: (state) => dayId => {
    return state.entries.filter(entry => entry.dayId === dayId);
  }
};

const actions = {
  addEntry(context, data) {
    context.commit("addEntry", data);
  },
  updateEntry(context, data) {
    context.commit("updateEntry", data);
  }
};

const mutations = {
  addEntry(state, { dayId, type }) {
    state.entries = [
      ...state.entries,
      {
        id: uuid.v4(),
        dayId,
        type,
        text: ""
      }
    ];
  },
  updateEntry(state, entry) {
    let entryIndex = state.entries.findIndex(e => e.id === entry.id);
    state.entries[entryIndex] = entry;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
