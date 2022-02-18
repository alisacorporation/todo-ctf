export default {
  actions: {},
  mutations: {},
  state: {
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", link: "/" },
      { title: "About", icon: "mdi-information", link: "/about" },
    ],
  },
  getters: {
    items: (state) => state.items,
  },
};
