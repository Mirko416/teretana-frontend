<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const clanarine = ref<any[]>([])
const clanarina_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Naziv', value: 'naziv' },
  { title: 'Cijena', value: 'cijena' },
  { title: 'Duljina trajanja', value: 'duljina_trajanja'}
]

async function dohvatiClanarine() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanarine?q=${encodeURIComponent(pretraga.value)}`)
    clanarine.value = await response.json()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/clanarine/dodaj')
}

async function pretraziClanarine() {
  await dohvatiClanarine()
}

function pregledaj(clanarina: any) {
  router.push(`/clanarine/${clanarina.id}`)
}

function uredi(clanarina: any) {
  router.push(`/clanarine/${clanarina.id}/uredi`)
}

function otvoriBrisanje(clanarina: any) {
  clanarina_za_brisanje.value = null
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  clanarina_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiClanarinu() {
  if (!clanarina_za_brisanje.value) {
    return
  }

  loading.value = true

  try {
    await fetch(`${API_URL}/clanarine/${clanarina_za_brisanje.value.id}`,{
      method: 'DELETE',
    })

    await dohvatiClanarine()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiClanarine()
})
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Clanarine

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="idiNaDodavanje"
      >
        Dodaj
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="pretraga"
        label="Pretraži članarine"
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
        @update:model-value="pretraziClanarine"
      />

      <v-data-table
        :headers="headers"
        :items="clanarine"
        :loading="loading"
      >
        <template #item.actions="{ item }">
          <v-tooltip text="Pregledaj">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-eye"
                size="small"
                variant="text"
                @click="pregledaj(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Uredi">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="uredi(item)"
              />
            </template>
          </v-tooltip>

          <v-tooltip text="Obriši">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="otvoriBrisanje(item)"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <v-dialog
      v-model="prikazi_dialog_brisanje"
      max-width="500"
  >
    <v-card>
      <v-card-title>
        Potvrda brisanja
      </v-card-title>

      <v-card-text>
        Jeste li sigurni da želite obrisati članarinu?
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
            variant="text"
            @click="zatvoriBrisanje"
        >
          Odustani
        </v-btn>

        <v-btn
            color="red"
            :loading="loading"
            @click="obrisiClanarinu()"
        >
          Obriši
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>