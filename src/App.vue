<template>
  <v-app>
    <v-locale-provider locale="ja">
      <v-main>
        <router-view />
      </v-main>
    </v-locale-provider>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    }
  },
})
</script>
