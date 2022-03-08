<template>
  <v-app>
    <Navigation />
    <Header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

export default {
  components: { Header, Navigation },
  beforeCreate() {
    this.$store.commit("INIT_TODOS");
    this.$store.commit("INIT_OPEN_NODES");
  },
  mounted() {
    try {
      const drawer_parsed = JSON.parse(localStorage.drawer);
      this.$store.commit("UPDATE_DRAWER", drawer_parsed);
    } catch (e) {
      localStorage.drawer = JSON.stringify(this.$store.getters.drawer);
      console.log("error", e);
    }
  },
};
</script>
