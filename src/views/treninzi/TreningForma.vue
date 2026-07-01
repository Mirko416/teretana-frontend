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

async function loadTrening() {
  if (!route.params.id) return

  const res = await api.get(`/treninzi/${route.params.id}`)

  Object.assign(trening, {
    clan_id: res.data.clan_id,
    trener_id: res.data.trener_id,
    datum: res.data.datum,
    opis: res.data.opis
  })
}
async function spremi() {
  loading.value = true

  try {
  const url = route.params.id
  ? `/treninzi/${route.params.id}`
  : '/treninzi'

  const method = route.params.id ? 'put' : 'post'

  await api.request({
    url,
    method,
    data: trening
  })

  router.push('/treninzi')
} catch (e) {
  console.error("Save error:", e)
} finally {
  loading.value = false
  }
}

onMounted(async () => {
  await loadDropdowns()
  await loadTrening()
})

</script>

<template>
  <v-container fluid class="page-gray">
    <div class="page-box">
      <h1 class="text-h4 font-weight-bold">
        {{ isEdit ? 'Uredi trening' : 'Dodaj trening' }}
      </h1>

      <p class="page-text">
        Ovdje možeš dodati novi trening ili urediti podatke postojećeg treninga.
      </p>

      <v-divider class="my-6" />

      <v-row>
        <v-col cols="12" md="6">
          <v-select
              v-model="trening.clan_id"
              :items="clanovi"
              item-title="title"
              item-value="value"
              label="Član"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-select
              v-model="trening.trener_id"
              :items="treneri"
              item-title="title"
              item-value="value"
              label="Trener"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="trening.datum"
              label="Datum i vrijeme"
              type="datetime-local"
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
              v-model="trening.opis"
              label="Opis treninga"
              prepend-inner-icon="mdi-dumbbell"
              variant="outlined"
          />
        </v-col>
      </v-row>

      <div class="page-actions">
        <v-btn
            variant="text"
            @click="router.push('/treninzi')"
        >
          Odustani
        </v-btn>

        <v-btn
            color="primary"
            :loading="loading"
            @click="spremi"
        >
          Spremi
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<style scoped>
.page-gray {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding: 48px 24px;
}

.page-box {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.page-text {
  font-size: 18px;
  color: #333333;
  margin-top: 8px;
  margin-bottom: 0;
}

.page-table {
  background: white;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 8px;
}

:deep(.v-data-table),
:deep(.v-field) {
  background: white;
  color: black;
}

:deep(.v-data-table-header__content),
:deep(.v-data-table__td),
:deep(.v-label),
:deep(input) {
  color: black;
}
</style>