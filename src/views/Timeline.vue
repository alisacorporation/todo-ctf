<template>
  <v-timeline v-if="todos.length">
    <v-timeline-item
      v-for="(todo, i) in todos"
      :key="todo.id"
      :icon="todo.icon"
      :class="{ 'text-right': i % 2 !== 0 }"
    >
      {{ todo.name }}
    </v-timeline-item>
  </v-timeline>
</template>

<script>
export default {
  name: "Timeline",
  data: () => ({}),
  computed: {
    todos: {
      set(todos) {
        this.$store.commit("UPDATE_TODOS", todos);
      },
      get() {
        return this.$store.getters.todos;
      },
    },
  },
};
</script>

<style scoped></style>
