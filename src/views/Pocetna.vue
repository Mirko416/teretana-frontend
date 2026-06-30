<script setup>
import { ref, onMounted } from 'vue'

const broj = ref({
  clanovi: 0,
  treneri: 0,
  treninzi: 0,
  clanarine: 0
})

async function loadBroj() {
  const res = await fetch('http://localhost:5000/dashboard')
  broj.value = await res.json()
}

onMounted(() => {
  loadBroj()
})
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row class="ma-0 fill-height" dense>

      <v-col cols="12" md="3" class="d-flex">
        <v-card class="pa-6 flex-grow-1" height="180" color="primary" dark>
          <div class="text-h6">Članovi</div>
          <div class="text-h4">{{ broj.clanovi }}</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3" class="d-flex">
        <v-card class="pa-6 flex-grow-1" height="180" color="primary" dark>
          <div class="text-h6">Treneri</div>
          <div class="text-h4">{{ broj.treneri }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>