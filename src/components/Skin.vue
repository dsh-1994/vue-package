<template>
  <v-menu>
    <template #activator="{ props }">
      <VBtn size="smail" variant="text" :icon="iconfn" v-bind="props"></VBtn>
    </template>
    <v-list :selected="[userConfigStore.skinDefault]" @update:selected="sel">
      <v-list-subheader>{{ $t(`skin.title`) }}</v-list-subheader>
      <v-list-item
        v-for="item in userConfigStore.skinList"
        :key="item.value"
        :value="item.value"
        density="compact"
      >
        <v-list-item-title>
          {{ $t(`skin.${item.value}`) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="tsx" setup>
// 皮肤组件
import { useUserConfigStore } from "@/stores/user-config";
import ShowSvg from "show-svg";
import { onMounted, onUnmounted, watchEffect } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const userConfigStore = useUserConfigStore();

function iconfn() {
  return <ShowSvg size={"22px"} name="skin" />;
}

function sel(v: string[]) {
  userConfigStore.skinDefault = v[0];
}

// 系统设置外观，监听选择器
watchEffect(() => {
  if (userConfigStore.skinDefault === "auto") {
    // 如果是自动，需要获取系统的
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
    if (themeMedia.matches) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  } else {
    setTheme(userConfigStore.skinDefault);
  }
});

// 监听外观变化，直接监听系统
const themeMediaFn = (ev: MediaQueryListEvent) => {
  if (userConfigStore.skinDefault === "auto") {
    if (ev.matches) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
};
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
onMounted(() => {
  themeMedia.addEventListener("change", themeMediaFn);
});
onUnmounted(() => {
  themeMedia.removeEventListener("change", themeMediaFn);
});

// 设置皮肤
function setTheme(themeValue: string) {
  theme.global.name.value = themeValue;
  userConfigStore.skin = themeValue;
}
</script>
