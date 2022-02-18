<template>
  <v-app-bar
    app
    color="#6A76AB"
    dark
    prominent
    :src="require('@/assets/img/bg' + rnd_bg + '.jpg')"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.1)"
      ></v-img>
    </template>

    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({}),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(value) {
        this.$store.commit("UPDATE_DRAWER", value);
      },
    },
    rnd_bg() {
      return Math.floor(Math.random() * 4) + 1;
    },
  },
};
</script>

<style scoped></style>
