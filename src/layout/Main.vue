<template>
  <DLayout
    v-model:menu-opened="menuOpened"
    v-model:menu-selected="menuSelected"
    v-model:tab-select-value="tabSelectValue"
    :menu-options="menuOptions"
    :tab-options="tabOptions"
    @update:menu-opened="onMenuOpened"
    @update:menu-selected="onMenuSelected"
    @update:tab-select-value="onTabSelectValue"
    @delete:tab-option="onDeleteTabOption"
  >
    <template #logo>
      <div style="padding-left: 22px; width: 100%; height: 100%">
        <img style="max-width: 100%; max-height: 100%" :src="Logo" />
      </div>
    </template>
    <template #appBarAction>
      <div
        style="
          display: inline-flex;
          gap: 8px;
          align-items: center;
          height: 100%;
        "
      >
        <Language />
        <User />
      </div>
    </template>
    <RouterView />
  </DLayout>
</template>
<script lang="tsx" setup>
// 主布局
import {
  DLayout,
  type DLayoutMenuOptions,
  type DLayoutTabOptions,
} from "dida-ui";
import Logo from "@/assets/vuetify-logo-light.png";
import { computed, ref } from "vue";
import ShowSvg from "show-svg";
import Language from "@/components/Language.vue";
import User from "@/components/User.vue";
import { useI18n } from "vue-i18n";
import { findManagerByTree, findTree, treeToArray } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { useCurrentTabsStore } from "@/stores/current-tabs";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const currentTabsStore = useCurrentTabsStore();

const menuOpened = ref<string[]>([]);
const menuSelected = ref<string[]>([]);
const menuOptions = computed<DLayoutMenuOptions>(() => [
  {
    title: t("menu.workbenches"),
    value: "workbenches",
    prependIcon: () => <ShowSvg name="workbenches" />,
    children: [
      {
        title: t("menu.hotel"),
        value: "workbenches-hotel",
        to: { name: "workbenches-hotel" },
      },
      {
        title: t("menu.secondaryConfirmation"),
        value: "workbenches-secondary_confirmation",
        to: { name: "workbenches-secondary_confirmation" },
      },
      {
        title: t("menu.planeTicket"),
        value: "workbenches-plane_ticket",
        to: { name: "workbenches-plane_ticket" },
      },
      {
        title: t("menu.operation"),
        value: "workbenches-operation",
        to: { name: "workbenches-operation" },
      },
    ],
  },
  {
    title: t("menu.workOrderCenter"),
    value: "work_order_center",
    prependIcon: () => <ShowSvg name="work-order-center" color="" />,
    to: { name: "work_order_center" },
  },
  {
    title: t("menu.staffManagement"),
    value: "staff_management",
    prependIcon: () => <ShowSvg name="staff-management" />,
    to: { name: "staff_management" },
  },
  {
    title: t("menu.monitoringBoard"),
    value: "monitoring_board",
    prependIcon: () => <ShowSvg name="monitoring-board" />,
    to: { name: "monitoring_board" },
  },
  {
    title: t("menu.processConfiguration"),
    value: "process_configuration",
    prependIcon: () => <ShowSvg name="process-configuration" />,
    to: { name: "process_configuration" },
  },
  {
    title: t("menu.knowledgeBase"),
    value: "knowledge_base",
    prependIcon: () => <ShowSvg name="knowledge-base" />,
    to: { name: "knowledge_base" },
  },
]);

const menuList = computed<DLayoutMenuOptions>(() =>
  treeToArray(menuOptions.value)
);
const tabOptions = computed<DLayoutTabOptions>(() =>
  menuList.value.filter((menu) =>
    currentTabsStore.tabOptionKeys.has(menu.value)
  )
);
const tabSelectValue = ref<string>("");

function onMenuOpened(value: string[]) {
  // console.log("Home onOpened", value);
}
function onMenuSelected(value: string[]) {
  // console.log("Home onSelected", value);
  // 左侧menu选中，需要设置tab菜单
  // 如果不需要tab，如果不需要联动就不需要监听
  const pathname = value[0];
  if (pathname) {
    currentTabsStore.addTabOptionList(pathname); // 加一个tab
    tabSelectValue.value = pathname; // 选中tab
  }
}
function onTabSelectValue(value?: string) {
  // console.log("Home onTabSelectValue", value);
  // tab菜单选中，需要对应到左侧menu选中、展开的值
  if (value) {
    menuSelected.value = [value];
    menuOpened.value = findManagerByTree(menuOptions.value, value).map(
      (item) => item.value
    );
  } else {
    // 这表示tab都被删除了，剩下空的列表返回
    menuSelected.value = [];
    menuOpened.value = [];
    router.push("/");
  }
}
function onDeleteTabOption(value: string) {
  // console.log("Home onDeleteTabOption", value);
  // 删除tab菜单
  currentTabsStore.delTabOptionList(value);
}

// 初始化时手动跳转一次
if (typeof route.name === "string" && route.name) {
  const menuOption = findTree(menuOptions.value, route.name);
  if (menuOption && menuOption.to) {
    // 是路由，选中
    onMenuSelected([menuOption.value]);
  }
}
</script>
