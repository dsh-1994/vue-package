import { defineComponent, withModifiers, type PropType } from "vue";
import "./DLayout.scss";
import { VBtn, VTab, VTabs } from "vuetify/components";
import { useVModel } from "@vueuse/core";

import config from "../../styles/theme.module.scss";
import ShowSvg from "show-svg";
import { useRouter, type RouteLocationRaw } from "vue-router";

export type DLayoutTabOption = {
  title: string;
  value: string;
  exact?: boolean;
  to?: RouteLocationRaw;
};
export type DLayoutTabOptions = Array<DLayoutTabOption>;

export const DLayoutTabsPropsT = {
  /** 头高度 */
  headerHeight: {
    type: Number,
    default: 64,
  },
  /** tab 选项 */
  tabOptions: {
    type: Array as PropType<DLayoutTabOptions>,
    default: [],
  },
  /** tab 选中值 */
  tabSelectValue: {
    type: String,
  },
  /** tab 右侧菜单 */
  tabShowMenu: {
    type: Boolean,
    default: true,
  },
} as const;
export const DLayoutTabsEmitsT = {
  "update:tabSelectValue": (_value?: string) => true,
  "delete:tabOption": (_value: string) => true,
};

export const DLayoutTabs = defineComponent({
  name: "DLayoutTabs",
  props: DLayoutTabsPropsT,
  emits: DLayoutTabsEmitsT,
  setup(props, { emit }) {
    const router = useRouter();

    // 外部状态，如果外部未设置初始值就不做双向绑定
    const tabSelectValueModel = useVModel(props, "tabSelectValue", emit);

    // 删除
    const handleRemove = (tab: any, tabIndex: number) => {
      if (tab.value === tabSelectValueModel.value) {
        // 删除本条，切换位置，优先找到下一条
        let newTab = props.tabOptions[tabIndex + 1];
        if (!newTab) {
          // 如果没有就找前一条
          newTab = props.tabOptions[tabIndex - 1];
        }
        // 这是新位置，有可能前后都没有
        const value = newTab?.value ?? undefined;
        // 触发更新
        updateValue(value);
        if (newTab && newTab.to) {
          // 删除，如果新节点是路由，则自动跳转
          router.push(newTab.to);
        }
      }
      emit("delete:tabOption", tab.value);
    };

    // 更新
    const updateValue = (value: any) => {
      if (tabSelectValueModel.value == null) {
        // 没有传入值，主动触发事件
        emit("update:tabSelectValue", value);
      } else {
        tabSelectValueModel.value = value;
      }
    };

    return () => {
      return (
        <VTabs
          height={props.headerHeight - 8}
          align-tabs="title"
          color={config["--light-color"]}
          hideSlider
          showArrows
          mandatory
          {...(tabSelectValueModel.value == null
            ? {}
            : { modelValue: tabSelectValueModel.value })}
          onUpdate:modelValue={updateValue}
          prevIcon={() => (
            <div class={"d-layout-tab-prev"}>
              <VBtn
                active
                color={config["--light-color"]}
                variant="text"
                size={20}
                icon={() => <ShowSvg size={"10px"} name="arrow-left" />}
              ></VBtn>
            </div>
          )}
          nextIcon={() => (
            <div class={"d-layout-tab-next"}>
              <VBtn
                active
                color={config["--light-color"]}
                variant="text"
                size={20}
                icon={() => <ShowSvg size={"10px"} name="arrow-right" />}
              ></VBtn>
            </div>
          )}
        >
          {props.tabOptions.map((option, tabIndex) => (
            <VTab
              key={option.value}
              baseColor={"grey-darken-1"}
              rounded={"t-lg"}
              {...option}
              v-slots={{
                append: () => {
                  return (
                    <div
                      class={"d-layout-tab-close"}
                      onClick={withModifiers(() => {
                        handleRemove(option, tabIndex);
                      }, ["stop", "prevent"])}
                    >
                      <ShowSvg size={"10px"} name="close" />
                    </div>
                  );
                },
              }}
            >
              <div class={"d-layout-tab-text"}>{option.title}</div>
              <div class={"d-layout-tab-before"}></div>
              <div class={"d-layout-tab-after"}></div>
            </VTab>
          ))}
        </VTabs>
      );
    };
  },
});
