export default {
  actions: {},
  mutations: {
    UPDATE_DRAWER(state, value) {
      console.log("UPDATE_DRAWER", value);
      window.localStorage.setItem("drawer", value);
      state.drawer = value;
    },
  },
  state: {
    drawer: window.localStorage.getItem("drawer") ?? false,
  },
  getters: {
    drawer: (state) => state.drawer,
  },
};
