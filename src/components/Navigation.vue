<template>
  <v-navigation-drawer
    app
    dark
    :src="require('@/assets/img/bg' + rnd_bg + '.jpg')"
    v-model="drawer"
  >
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["items"]),
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
