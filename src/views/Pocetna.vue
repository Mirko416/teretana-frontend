<script setup lang="ts">
  import { onMounted } from 'vue'
  import api from '@/services/api'

  let clanovi = []

  onMounted(async () => {
    try {
      const res = await api.get('/clanovi')
      clanovi = res.data
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  })
</script>

<template>
  <div>
    <v-card-text v-if="clanovi.length !== 0">
      <p><strong>BROJ ČLANOVA:</strong> {{ clanovi.length }}</p>
      <p><strong>BROJ TRENERA:</strong> {{ clanovi.length + 1 }}</p>

    </v-card-text>

  </div>
</template>