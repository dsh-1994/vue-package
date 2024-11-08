import { defineComponent, type PropType, type VNode } from "vue";
import "./DLayout.scss";
import { VList, VListGroup, VListItem } from "vuetify/components";
import { useVModels } from "@vueuse/core";

import type { RouteLocationRaw } from "vue-router";
import { useUserConfigStore } from "@/stores/user-config";

export type DLayoutMenuOption = {
  title: string;
  value: string;
  exact?: boolean;
  to?: RouteLocationRaw;
  prependIcon?: () => VNode;
} & { children?: DLayoutMenuOptions };
export type DLayoutMenuOptions = Array<DLayoutMenuOption>;

export const DLayoutMenuPropsT = {
  /** 是否显示 */
  menuVisible: {
    type: Boolean,
    default: true,
  },
  /** 菜单选项 */
  menuOptions: {
    type: Array as PropType<DLayoutMenuOptions>,
    required: true,
  },
  /** 菜单展开 */
  menuOpened: {
    type: Array as PropType<string[]>,
  },
  /** 菜单选中 */
  modelValue: {
    type: Array as PropType<string[]>,
  },
} as const;
export const DLayoutMenuEmitsT = {
  "update:menuOpened": (_value: string[]) => true,
  "update:modelValue": (_value: string[]) => true,
};

export const DLayoutMenu = defineComponent({
  name: "DLayoutMenu",
  props: DLayoutMenuPropsT,
  emits: DLayoutMenuEmitsT,
  setup(props, { emit }) {
    const userConfigStore = useUserConfigStore();

    // 渲染菜单，可以使用原生 items 代替，但是这样将失去定制的功能
    // 按道理 DLayoutMenuOptions 需要从原生继承，但是这里没找到哪里导出原生属性，所以暂时先自己写一份简化版的
    const renderItem = (itemProps: DLayoutMenuOption & Record<string, any>) => {
      return <VListItem rounded={"lg"} {...itemProps}></VListItem>;
    };
    const renderMenu = (options: DLayoutMenuOptions, level: number) => {
      return options.map((option) => {
        const itemProps = {
          key: option.value,
          value: option.value,
          title: option.title,
          exact: option.exact,
          to: option.to,
          prependIcon: option.prependIcon,
        };
        if (option.children) {
          return (
            <VListGroup
              key={option.value}
              value={option.value}
              v-slots={{
                activator: ({ props }) => {
                  return renderItem({ ...props, ...itemProps });
                },
              }}
            >
              {renderMenu(option.children, level + 1)}
            </VListGroup>
          );
        }
        return renderItem(itemProps);
      });
    };

    // 外部状态，如果外部未设置初始值就不做双向绑定
    const { menuOpened, modelValue } = useVModels(props, emit);

    return () => {
      return (
        <VList
          color={"var(--dida-primary-color)"}
          baseColor={
            userConfigStore.skin === "dark"
              ? "var(--dida-primary-default-color)"
              : undefined
          }
          mandatory
          {...(menuOpened.value == null ? {} : { opened: menuOpened.value })}
          {...(modelValue.value == null ? {} : { selected: modelValue.value })}
          onUpdate:opened={(value: string[]) => {
            if (menuOpened.value == null) {
              emit("update:menuOpened", value);
            } else {
              menuOpened.value = value;
            }
          }}
          onUpdate:selected={(value: string[]) => {
            if (modelValue.value == null) {
              emit("update:modelValue", value);
            } else {
              modelValue.value = value;
            }
          }}
        >
          {renderMenu(props.menuOptions, 1)}
        </VList>
      );
    };
  },
});
