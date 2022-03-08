<template>
  <v-form @submit.prevent="add_todo">
    <v-text-field
      v-model="message"
      append-outer-icon="mdi-plus-circle"
      clear-icon="mdi-close-circle"
      clearable
      label="TODO"
      type="text"
      :prepend-icon="icon"
      :messages="error"
      @click:prepend="changeIcon"
      @click:clear="clearMessage"
      @click:append-outer.prevent="add_todo"
      style="border-radius: 0"
      class="mb-2"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  name: "InputTodo",
  props: ["nodes_count"],
  data: () => ({
    message: null,
    error: null,
    iconIndex: 0,
    icons: [
      "mdi-format-list-checks",
      "mdi-language-html5",
      "mdi-language-css3",
      "mdi-language-javascript",
      "mdi-language-php",
      "mdi-database-search",
      "mdi-nodejs",
      "mdi-vuejs",
      "mdi-language-cpp",
    ],
  }),
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
  },
  methods: {
    add_todo() {
      console.log("tried to add todo");
      if (!this.message) {
        this.error = "message can not be empty";
        return;
      }
      let new_todo = {
        id: null,
        name: this.message,
        created: Date.now(),
        updated: null,
        icon: this.icon,
        completed: false,
        children: [],
      };
      this.$store.dispatch("add_todo", new_todo);
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>

<style scoped></style>
