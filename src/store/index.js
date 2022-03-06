import Vue from "vue";
import Vuex from "vuex";
import drawer from "@/store/modules/drawer";
import navigation from "@/store/modules/navigation";
import todo from "@/store/modules/todo";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  mutations: {},
  state: {},
  getters: {},
  modules: {
    drawer,
    navigation,
    todo,
  },
});
