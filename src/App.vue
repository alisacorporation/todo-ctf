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
};
</script>
