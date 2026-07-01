<template>
  <v-app id="inspire">
    <v-app-bar flat class="app-bar">
      <v-container class="mx-auto d-flex align-center">
        <v-btn
            v-for="link in links"
            :key="link.link"
            :text="link.text"
            :to="link.link"
            variant="text"
            class="nav-btn"
        />

        <v-spacer />
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <router-view />
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
<style scoped>
.app-bar {
  background: #1976d2;
  color: white;
}

.nav-btn {
  color: white;
  font-weight: 600;
}
</style>