<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const  API_URL = 'http://localhost:5000'

const router = useRouter()
const loading = ref(false)
const prikazi_dialog_brisanje = ref(false)
const clanovi = ref<any[]>([])
const clan_za_brisanje = ref<any>(null)
const pretraga = ref('')

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'E-pošta', value: 'email' },
  { title: 'Mobitel', value: 'mobitel' },
  { title: 'Datum učlanjenja', key: 'datum učlanjenja', sortable: false },
]

async function dohvatiClanove() {
  loading.value = true

  try {
    const response = await fetch(`${API_URL}/clanovi?q=${encodeURIComponent(pretraga.value)}`)
    clanovi.value = await response.json()
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

  function idiNaDodavanje() {
    router.push('/clanovi/dodaj')
  }

  async function pretraziClanove() {
  await dohvatiClanove()
  }

  function pregledaj(clan: any) {
    router.push(`/clanovi/${clan.id}`)
  }

  function uredi(clan: any) {
    router.push(`/clanovi/${clan.id}/uredi`)
  }

  function otvoriBrisanje(clan: any) {
    clan_za_brisanje.value = clan
    prikazi_dialog_brisanje.value = true
  }

  function zatvoriBrisanje() {
    clan_za_brisanje.value = null
    prikazi_dialog_brisanje.value = false
  }

  async function obrisiClana() {
    if (!clan_za_brisanje.value) {
      return
    }

    loading.value = true

    try {
      await fetch(`${API_URL}/clanovi/${clan_za_brisanje.value.id}`, {
        method: 'DELETE',
      })

      await dohvatiClanove()
    } catch (error) {
      console.log(error)
    }

    loading.value = false
    zatvoriBrisanje()
  }

  onMounted(async () => {
    await dohvatiClanove()
  })
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      Clanovi

      <v-spacer />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="idiNaDodavanje()"
      >
        Dodaj
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="pretraga"
        label="Pretraži članove"
        prepend-inner-icon="mdi-magnify"
        clearable
        class="mb-4"
        @update:model-value="pretraziClanove()"
      />

      <v-data-table
        :headers="headers"
        :items="clanovi"
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
        Jeste li sigurni da želite obrisati člana?
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          variant="text"
          @click="zatvoriBrisanje()"
        >
          Odustani
        </v-btn>

        <v-btn
          color="red"
          :loading="loading"
          @click="obrisiClana"
        >
          Obriši
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>