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
  { title: 'Ime', value: 'ime' },
  { title: 'Prezime', value: 'prezime' },
  { title: 'Akcije', key: 'actions', sortable: false }
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
  <v-container fluid class="clanovi-page">
    <div class="clanovi-box">
      <div class="clanovi-header">
        <div>
          <h1 class="text-h4 font-weight-bold">
            Članovi
          </h1>

          <p class="clanovi-text">
            Upravljanje članovima!
            U ovom dijelu sustava omogućeno je jednostavno upravljanje svim članovima teretane. Korisnik može pregledati popis članova, vidjeti njihove osnovne podatke, te po potrebi urediti ili obrisati postojeće zapise. Ova funkcionalnost olakšava vođenje evidencije i održavanje ažurnih podataka o svim članovima.          </p>
        </div>

        <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            @click="idiNaDodavanje()"
        >
          Dodaj
        </v-btn>
      </div>

      <v-divider class="mb-6" />

      <v-text-field
          v-model="pretraga"
          label="Pretraži članove"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          class="mb-6"
          @update:model-value="pretraziClanove()"
      />

      <v-data-table
          :headers="headers"
          :items="clanovi"
          :loading="loading"
          class="clanovi-table"
      >
        <template #item.actions="{ item }">
          <v-tooltip text="Pregledaj">
            <template #activator="{ props }">
              <v-btn
                  v-bind="props"
                  icon="mdi-eye"
                  size="small"
                  variant="text"
                  color="primary"
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
                  color="primary"
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
                  color="red"
                  @click="otvoriBrisanje(item)"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </div>
  </v-container>

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
<style scoped>
.clanovi-page {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding-top: 48px;
  padding-bottom: 48px;
}

.clanovi-box {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.clanovi-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.clanovi-text {
  font-size: 18px;
  color: #333333;
  margin-top: 8px;
  margin-bottom: 0;
}

.clanovi-table {
  background: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

:deep(.v-data-table) {
  background: white;
  color: black;
}

:deep(.v-data-table-header__content) {
  color: black;
  font-weight: 700;
}

:deep(.v-data-table__td) {
  color: black;
}

:deep(.v-field) {
  background: white;
  color: black;
}
</style>