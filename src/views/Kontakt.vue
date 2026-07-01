<script setup lang="ts">

</script>

<template>
  <v-container fluid class="contact-page">
    <div class="contact-box">
      <h1 class="text-h4 font-weight-bold mb-4">
        Kontakt
      </h1>

      <p>
        Ako imate bilo kakva pitanja, trebate dodatne informacije ili želite postati dio naše zajednice, slobodno nam se obratite. Tim Power House Gym uvijek vam stoji na raspolaganju kako bismo vam pomogli u ostvarivanju vaših fitness ciljeva.
      </p>

      <p>
        Možete nas kontaktirati putem telefona, e-maila ili nas posjetiti osobno u našoj teretani. Rado ćemo vam pružiti sve potrebne informacije o treninzima, članarinama i radu našeg centra.
      </p>

      <div class="contact-info">
        <div class="contact-item">
          <v-icon color="primary" class="mr-2">
            mdi-map-marker
          </v-icon>
          <span><strong>Adresa:</strong> Mostar bb</span>
        </div>

        <div class="contact-item">
          <v-icon color="primary" class="mr-2">
            mdi-phone
          </v-icon>
          <span><strong>Telefon:</strong> 036 486 252</span>
        </div>

        <div class="contact-item">
          <v-icon color="primary" class="mr-2">
            mdi-email
          </v-icon>
          <span><strong>E-mail:</strong> power.house@gmail.com</span>
        </div>
      </div>

      <p>
        Pratite nas i na društvenim mrežama kako biste bili u tijeku s novostima, ponudama i savjetima za trening.
      </p>

      <p class="contact-ending">
        Power House Gym - mjesto gdje snaga postaje navika.
      </p>
    </div>
  </v-container>
</template>

<style scoped>
.contact-page {
  min-height: calc(100vh - 64px);
  background: #eeeeee;
  padding: 48px 24px;
}

.contact-box {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  color: black;
  padding: 40px;
  border-radius: 8px;
}

.contact-box p {
  font-size: 18px;
  line-height: 1.7;
  color: #333333;
  margin-bottom: 20px;
}

.contact-info {
  background: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 20px;
  margin: 28px 0;
}

.contact-item {
  display: flex;
  align-items: center;
  color: black;
  font-size: 18px;
  margin-bottom: 14px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-ending {
  font-weight: 700;
  color: black;
}
</style>