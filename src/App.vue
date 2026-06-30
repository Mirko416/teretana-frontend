<template>
<v-app id="inspire">
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
          class="me-4 "
          color="grey-darken-1"
          size="32"
      ></v-avatar>

      <v-btn
          v-for="link in links"
      :key="link.link"
      :text="link.text"
      :to="link.link"
      variant="text"
      ></v-btn>

    <v-spacer></v-spacer>

    <v-responsive max-width="160">
      <v-text-field
          density="compact"
          label="Search"
          rounded="lg"
          variant="solo-filled"
          flat
          hide-details
          single-line
      ></v-text-field>
    </v-responsive>
  </v-container>
</v-app-bar>

<v-main class="bg-grey-lighten-3">
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">

      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet
          min-height="70vh"
          rounded="lg"
          class="pa-4 bg-white"
      >
        <router-view/>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>
</v-main>
</v-app>
</template>

<script setup>
const links = [
  {
    link: "/",
    text: "Početna"
  },
  {
    link: "/clanovi",
    text: "Članovi"
  },
  {
    link: "/treneri",
    text: "Treneri"
  },
  {
    link: "/treninzi",
    text: "Treninzi"
  },
  {
    link: "/clanarine",
    text: "Clanarine"
  },
  {
    link: "/o-nama",
    text: "O nama"
  },
  {
    link: "/kontakt",
    text: "Kontakt"
  },

  ]
</script>