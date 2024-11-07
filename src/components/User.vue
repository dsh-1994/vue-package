<template>
  <v-menu>
    <template #activator="{ props }">
      <VBtn size="smail" variant="text" rounded="circle" v-bind="props">
        <div class="name">
          {{ firstChar }}
        </div>
      </VBtn>
    </template>
    <v-list>
      <v-list-item
        v-for="item in userConfigStore.menuList"
        :key="item.value"
        :value="item.value"
        density="compact"
      >
        <v-list-item-title>
          {{ $t(`user.${item.value}`, { name: userName }) }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="tsx" setup>
// 用户信息组件
import { useUserConfigStore } from "@/stores/user-config";
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { locale } = useI18n();
const userConfigStore = useUserConfigStore();

// 计算用户名
const userName = computed(() => {
  if (locale.value === "zh-cn") {
    return userConfigStore.useInfo.zhCnName;
  }
  // 除了中文环境，其他都使用英文
  return userConfigStore.useInfo.enName;
});
// 取出首字符
const firstChar = computed(() => userName.value.slice(0, 1));
</script>

<style lang="scss" scoped>
.name {
  width: 22px;
  height: 22px;
  background-color: #ad90ff;
  border-radius: 50%;
  text-align: center;
  line-height: 22px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
}
</style>
