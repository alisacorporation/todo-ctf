<template>
  <div>
    <v-progress-linear
      color="blue-grey"
      height="25"
      class="pb-5"
      :value="percentage"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
    <InputTodo :nodes_count="this.total_nodes_count" />
    <template v-if="todos.length">
      <v-card tile>
        <v-toolbar color="blue-grey" dark dense flat>
          <v-toolbar-title class="text-body-2"> Todos </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon small dark @click="toggle_open_nodes">
            <v-icon>mdi-arrow-expand-vertical</v-icon>
          </v-btn>
          <v-btn icon small dark @click="toggle_all">
            <v-icon>mdi-checkbox-multiple-marked-circle</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn small icon dark v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5"> Delete todos </v-card-title>
              <v-card-text
                >Are you sure you want to delete all todos? This cannot be
                undone.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="remove_todos">
                  Agree
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-card-text>
          <v-treeview
            v-model="selection"
            :items="todos"
            :selection-type="selection_type"
            :return-object="selection_return_type"
            :open="open_nodes"
            selectable
            transition
            hoverable
            dark
          >
            <template v-slot:label="{ item }">
              <template v-if="item.completed">
                <del class="green--text text--accent-2">{{ item.name }}</del>
              </template>
              <template v-else>
                <span class="red--text text--accent-2">{{ item.name }}</span>
              </template>
            </template>
            <template v-slot:prepend="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
            </template>
            <template v-slot:append="{ item }">
              <v-btn icon small dark class="px-2" @click="update_todo(item.id)">
                <template v-if="!item.completed">
                  <v-icon class="red--text text--accent-2"
                    >mdi-checkbox-blank-circle-outline</v-icon
                  >
                </template>
                <template v-else>
                  <v-icon class="green--text text--accent-2"
                    >mdi-checkbox-marked-circle-outline</v-icon
                  >
                </template>
              </v-btn>
              <v-btn icon small dark class="px-2" @click="remove_todo(item.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
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
    dialog: false,
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
      this.dialog = false;
      this.$store.dispatch("remove_todos");
    },
    remove_todo(id) {
      console.log("prepared to remove id", id);
      this.$store.dispatch("remove_todo", id);
    },
    update_todo(id) {
      this.$store.dispatch("update_todo", id);
      console.log("update todo", id);
    },
    toggle_all() {
      this.$store.dispatch("toggle_all");
    },
    toggle_open_nodes() {
      this.$store.dispatch("toggle_open_nodes");
    },
  },
  computed: {
    percentage() {
      if (this.$store.getters.total_todo_nodes === 0) return 0;

      return (
        (100 * this.$store.getters.completed_nodes) /
        this.$store.getters.total_todo_nodes
      );
    },
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
      set(total_nodes) {
        this.$store.commit("UPDATE_TOTAL_NODES_COUNT", total_nodes);
      },
      get() {
        return this.$store.getters.total_todo_nodes;
      },
    },
    open_nodes: {
      set(nodes) {
        this.$store.commit("UPDATE_OPEN_NODES", nodes);
      },
      get() {
        return this.$store.getters.open_nodes;
      },
    },
  },
};
</script>

<style scoped></style>
