<template>
  <v-menu>
    <template #activator="{ props }">
      <VBtn size="smail" variant="text" :icon="iconfn" v-bind="props"></VBtn>
    </template>
    <v-list mandatory :selected="[$i18n.locale]" @update:selected="sel">
      <v-list-item
        v-for="item in userConfigStore.languageList"
        :key="item.value"
        :value="item.value"
        density="compact"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="tsx" setup>
// 多语言组件
import { useI18n } from "vue-i18n";
import { useUserConfigStore } from "@/stores/user-config";
import ShowSvg from "show-svg";
import { watchEffect } from "vue";

const { locale } = useI18n();
const userConfigStore = useUserConfigStore();

function iconfn() {
  return <ShowSvg size={"20px"} name="multilingual" />;
}

function sel(v: string[]) {
  userConfigStore.local = v[0];
}
watchEffect(() => {
  locale.value = userConfigStore.local;
});
</script>
