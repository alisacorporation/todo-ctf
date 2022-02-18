<template>
  <v-app id="inspire">
    <Navigation />
    <Header />
    <v-main>
      <div class="pa-2">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

export default {
  components: { Header, Navigation },
  beforeMount() {
    if (window.localStorage.getItem("drawer") !== null) {
      console.log("set drawer from localStorage");
      this.$store.commit(
        "UPDATE_DRAWER",
        window.localStorage.getItem("drawer")
      );
    }
  },
};
</script>
