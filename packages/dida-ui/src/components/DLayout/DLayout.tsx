import { defineComponent, ref } from "vue";
import "./DLayout.scss";
import {
  VApp,
  VAppBar,
  VAppBarTitle,
  VBtn,
  VMain,
  VNavigationDrawer,
} from "vuetify/components";
import {
  DLayoutMenu,
  DLayoutMenuEmitsT,
  DLayoutMenuPropsT,
} from "./DLayoutMenu";
import { useVModel } from "@vueuse/core";
import config from "../../styles/theme.module.scss";
import { DLayoutTabsEmitsT, DLayoutTabsPropsT } from "./DLayoutTabs";
import { DLayoutTabs } from "./DLayoutTabs";
import ShowSvg from "show-svg";

export const DLayoutPropsT = {
  ...DLayoutMenuPropsT,
  ...DLayoutTabsPropsT,
} as const;
export const DLayoutEmitsT = {
  ...DLayoutMenuEmitsT,
  ...DLayoutTabsEmitsT,
};

export const DLayout = defineComponent({
  name: "DLayout",
  props: DLayoutPropsT,
  emits: DLayoutEmitsT,
  setup(props, { slots, emit }) {
    const drawer = ref(true); // 展开/收起

    // menu 双向绑定状态
    const menuOpenedModel = useVModel(props, "menuOpened", emit);
    const menuSelectedModel = useVModel(props, "menuSelected", emit);

    // tab 双向绑定状态
    const tabSelectValueModel = useVModel(props, "tabSelectValue", emit);

    return () => {
      return (
        <VApp class={"d-layout"}>
          <VNavigationDrawer
            v-model={drawer.value}
            floating
            v-slots={{
              prepend: () => (
                <div
                  class={"d-layout-prepend"}
                  style={{ height: `${props.headerHeight}px` }}
                >
                  <div class={"d-layout-prepend-inner rounded-lg"}>
                    <VBtn
                      class={{
                        "d-layout-anime-flip": !drawer.value,
                      }}
                      active
                      color={config["--light-color"]}
                      rounded={"lg"}
                      size={"small"}
                      variant="text"
                      icon={() => (
                        <ShowSvg
                          size={"20px"}
                          color={config["--light-color"]}
                          name="left"
                        />
                      )}
                      onClick={() => (drawer.value = !drawer.value)}
                    ></VBtn>
                  </div>
                </div>
              ),
            }}
          >
            <div class={"d-layout-menu"}>
              <div
                class={"d-layout-menu-logo"}
                style={{ height: `${props.headerHeight}px` }}
              >
                <div class={"d-layout-menu-logo-inner"}>{slots.logo?.()}</div>
              </div>
              <div class={"d-layout-menu-content"}>
                <DLayoutMenu
                  menuOptions={props.menuOptions}
                  v-model:menuOpened={menuOpenedModel.value}
                  v-model:menuSelected={menuSelectedModel.value}
                />
              </div>
            </div>
          </VNavigationDrawer>
          {props.menuVisible ? (
            <VAppBar flat>
              <div class={"d-layout-tabs-wrapper"}>
                <VAppBarTitle>
                  <div class={"d-layout-tabs"}>
                    <DLayoutTabs
                      headerHeight={props.headerHeight}
                      tabOptions={props.tabOptions}
                      v-model:tabSelectValue={tabSelectValueModel.value}
                      onDelete:tabOption={(...args) => {
                        emit("delete:tabOption", ...args);
                      }}
                    />
                  </div>
                </VAppBarTitle>
                {props.tabShowMenu ? (
                  <div class={"d-layout-tabs-menu"}>
                    {slots.appBarAction?.()}
                  </div>
                ) : null}
              </div>
            </VAppBar>
          ) : null}

          <VMain style={{ backgroundColor: config["--light-bg-color"] }}>
            {slots.default?.()}
          </VMain>
        </VApp>
      );
    };
  },
});
