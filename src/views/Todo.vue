<template>
  <div>
    <InputTodo :nodes_count="this.total_nodes_count" />
    <p>Selection: {{ selection }}</p>
    <p>nodes: {{ total_nodes_count }}</p>
    <template v-if="todos.length">
      <v-card tile>
        <v-toolbar color="blue-grey" dark dense flat>
          <v-toolbar-title class="text-body-2"> Todos </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon small @click="remove_todos">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-treeview
            v-model="selection"
            :items="todos"
            :selection-type="selection_type"
            :return-object="selection_return_type"
            open-on-click
            selectable
            transition
            dark
          >
            <template v-slot:prepend="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
            </template>
          </v-treeview>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import InputTodo from "@/components/InputTodo";
export default {
  name: "Todo",
  components: { InputTodo },
  data: () => ({
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
    },
  }),
  methods: {
    remove_todos() {
      this.$store.dispatch("remove_todos");
    },
  },
  computed: {
    todos: {
      set(todos) {
        this.$store.commit("UPDATE_TODOS", todos);
      },
      get() {
        return this.$store.getters.todos;
      },
    },
    selection: {
      set(selection) {
        this.$store.commit("UPDATE_SELECTION", selection);
      },
      get() {
        return this.$store.getters.selection;
      },
    },
    selection_type: {
      set(value) {
        this.$store.commit("UPDATE_SELECTION_TYPE", value);
      },
      get() {
        return this.$store.getters.selection_type;
      },
    },
    selection_return_type: {
      set(value) {
        this.$store.commit("UPDATE_SELECTION_RETURN_TYPE", value);
      },
      get() {
        return this.$store.getters.selection_return_type;
      },
    },
    total_nodes_count: {
      get() {
        return this.$store.getters.total_todo_nodes;
      },
      set(total_nodes) {
        this.$store.commit("UPDATE_TOTAL_NODES_COUNT", total_nodes);
      },
    },
  },
};
</script>

<style scoped></style>
