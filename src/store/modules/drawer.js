export default {
  actions: {},
  mutations: {
    UPDATE_DRAWER(state, value) {
      localStorage.drawer = JSON.stringify(value);
      state.drawer = value;
    },
  },
  state: {
    drawer: false,
  },
  getters: {
    drawer: (state) => state.drawer,
  },
};
