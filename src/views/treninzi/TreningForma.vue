<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()

const loading = ref(false)

const clanovi = ref<any[]>([])
const treneri = ref<any[]>([])

const trening = reactive<any>({
  clan_id: null,
  trener_id: null,
  datum: '',
  opis: ''
})

const isEdit = computed(() => !!route.params.id)

async function loadDropdowns() {
  try {
    const c = await api.get('/clanovi-dropdown')
    const t = await api.get('/treneri-dropdown')

    console.log("Clanovi:", c.data)
    console.log("Treneri", t.data)

    clanovi.value = c.data
    treneri.value = t.data
  } catch (e) {
  console.error("Dropdown error:", e)
  }
}
async function spremi() {
  loading.value = true

  const url = isEdit.value
  ? `/treninzi/${route.params.id}`
  : '/treninzi'

  const method = isEdit.value ? 'put' : 'post'

  await api.request({
    url,
    method,
    data: trening
  })

  loading.value = false
  router.push('/treninzi')
}

onMounted(loadDropdowns)
</script>

<template>
  <v-card max-width="700">
    <v-card-title>
      {{ isEdit ? 'Uredi trening' : 'Dodaj trening' }}
    </v-card-title>

    <v-card-text>

      <v-select
          v-model="trening.clan_id"
          :items="clanovi"
          item-title="title"
          item-value="value"
          label="Član"
      />

      <v-select
          v-model="trening.trener_id"
          :items="treneri"
          item-title="title"
          item-value="value"
          label="Trener"
      />

      <v-text-field
          v-model="trening.datum"
          label="Datum i vrijeme"
          type="datetime-local"
          prepend-inner-icon="mdi-calendar"
      />

      <v-text-field
          v-model="trening.opis"
          label="Opis treninga (npr. cardio, push day...)"
          prepend-inner-icon="mdi-dumbbell"
      />

    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn @click="router.push('/treninzi')">Odustani</v-btn>
      <v-btn color="primary" :loading="loading" @click="spremi">
        Spremi
      </v-btn>
    </v-card-actions>
  </v-card>
</template>