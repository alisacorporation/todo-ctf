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

    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5"> Reset todos </v-card-title>
        <v-card-text
          >Are you sure you want to delete all todos? This cannot be
          undone.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="reset_todos">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    dialog: false,
  }),
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
  methods: {
    reset_todos() {
      this.dialog = false;
      this.$store.dispatch("reset_todos");
    },
  },
};
</script>

<style scoped></style>
