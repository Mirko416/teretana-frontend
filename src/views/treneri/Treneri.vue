<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const treneri = ref<any[]>([])
const trener_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'Specijalizacija', value: 'specijalizacija' },
  { title: 'Akcije', key: 'actions', sortable: false}
]

async function dohvatiTrenere() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/treneri?q=${encodeURIComponent(pretraga.value)}`)
    const data = await response.json()
    treneri.value = data.items

    console.log(treneri.value)

  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

function idiNaDodavanje() {
  router.push('/treneri/dodaj')
}

async function pretraziTrenere() {
  await dohvatiTrenere()
}

function pregledaj(trener: any) {
  router.push(`/treneri/${trener.id}`)
}

function uredi(trener: any) {
  router.push(`/treneri/${trener.id}/uredi`)
}

function otvoriBrisanje(trener: any) {
  trener_za_brisanje.value = trener
  prikazi_dialog_brisanje.value = true
}

function zatvoriBrisanje() {
  trener_za_brisanje.value = null
  prikazi_dialog_brisanje.value = false
}

async function obrisiTrenera() {
  if (!trener_za_brisanje.value) {
    return
  }

  loading.value = true

  try {
    await fetch(`${API_URL}/treneri/${trener_za_brisanje.value.id}`, {
      method: 'DELETE',
    })

    await dohvatiTrenere()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
  zatvoriBrisanje()
}

onMounted(async () => {
  await dohvatiTrenere()
})

</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Treneri

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
          label="Pretraži trenere"
          prepend-inner-icon="mdi-magnify"
          clearable
          class="mb-4"
          @update:model-value="pretraziTrenere"
      />

      <v-data-table
          :headers="headers"
          :items="treneri"
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
        Jeste li sigurni da želite obrisati trenera?
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
            @click="obrisiTrenera"
        >
          Obriši
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>