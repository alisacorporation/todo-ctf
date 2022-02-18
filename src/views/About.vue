<template>
  <v-card tile>
    <v-toolbar color="blue-grey" dark dense flat>
      <v-toolbar-title class="text-body-2"> About </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <p>
        To create something, you need an algorithm, and it's good if this
        algorithm is not complicated. But what if the algorithm is quite complex
        and the application you are creating, the algorithms in it are mutually
        related to each other?
      </p>
      <p>
        Over time, it will begin to turn into a big lump, which will be
        difficult to understand and it will be difficult to keep it all in mind.
        Errors will start to come out, you will look for solutions to problems
        on the Internet - due to which you will be distracted and switch to
        other portals, as a result of which you will waste your precious time.
      </p>
      <p>
        You should create high-quality software, step by step, so that each
        function is responsible for only one action - at least adhere to this
        style of development. It will be easier for you to track the actions of
        the algorithm in the program with such development.
      </p>
      <p>
        Therefore, we have created this application so that you can concentrate
        on the work that you have to do. We called this app - Todo: Capture the
        Flag
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "About",
  methods: {
    next() {
      console.log("next clicked");
    },
  },
};
</script>

<style scoped></style>
