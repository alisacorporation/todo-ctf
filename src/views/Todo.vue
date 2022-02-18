<template>
  <v-card tile>
    <v-toolbar color="blue-grey" dark dense flat>
      <v-toolbar-title class="text-body-2"> Todo </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-treeview
        v-model="selection"
        :items="items"
        :selection-type="selectionType"
        selectable
        return-object
        open-all
        dark
      ></v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Todo",
  data: () => ({
    selectionType: "leaf",
    selection: [],
    items: [
      {
        id: 1,
        name: "Root",
        children: [
          { id: 2, name: "Child #1" },
          { id: 3, name: "Child #2" },
          {
            id: 4,
            name: "Child #3",
            children: [
              { id: 5, name: "Grandchild #1" },
              { id: 6, name: "Grandchild #2" },
            ],
          },
        ],
      },
    ],
  }),
};
</script>

<style scoped></style>
