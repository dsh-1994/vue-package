import { defineComponent, withModifiers, type PropType } from 'vue'
import './DLayout.scss'
import { VBtn, VTab, VTabs } from 'vuetify/components'
import { useVModels } from '@vueuse/core'

import config from '../../styles/theme.module.scss'
import ShowSvg from 'show-svg'

export type DLayoutTabOption = {
  title: string
  value: string
}
export type DLayoutTabOptions = Array<DLayoutTabOption>

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
} as const
export const DLayoutTabsEmitsT = {
  'update:tabOptions': (_value: DLayoutTabOptions) => true,
  'update:tabSelectValue': (_value?: string) => true,
  'delete:tabOption': (_value: string) => true,
}

export const DLayoutTabs = defineComponent({
  name: 'DLayoutTabs',
  props: DLayoutTabsPropsT,
  emits: DLayoutTabsEmitsT,
  setup(props, { emit }) {
    // 外部状态，如果外部未设置初始值就不做双向绑定
    const { tabOptions, tabSelectValue } = useVModels(props, emit)

    // 删除
    const handleRemove = (tab: any, tabIndex: number) => {
      if (tab.value === tabSelectValue.value) {
        // 删除本条，切换位置，优先找到下一条
        let newTab = tabOptions.value[tabIndex + 1]
        if (!newTab) {
          // 如果没有就找前一条
          newTab = tabOptions.value[tabIndex - 1]
        }
        // 这是新位置，有可能前后都没有
        const value = newTab?.value ?? undefined
        updateValue(value)
      }
      // 过滤掉被删除的数据
      tabOptions.value = tabOptions.value.filter(
        option => option.value !== tab.value,
      )
      emit('delete:tabOption', tab.value)
    }

    // 更新
    const updateValue = (value: any) => {
      tabSelectValue.value = value
    }

    return () => {
      return (
        <VTabs
          height={props.headerHeight - 8}
          align-tabs="title"
          color={config['--light-color']}
          hideSlider
          showArrows
          modelValue={tabSelectValue.value}
          onUpdate:modelValue={updateValue}
          prevIcon={() => (
            <div class={'d-layout-tab-prev'}>
              <VBtn
                active
                color={config['--light-color']}
                variant="text"
                size={20}
                icon={() => <ShowSvg size={'10px'} name="arrow-left" />}
              ></VBtn>
            </div>
          )}
          nextIcon={() => (
            <div class={'d-layout-tab-next'}>
              <VBtn
                active
                color={config['--light-color']}
                variant="text"
                size={20}
                icon={() => <ShowSvg size={'10px'} name="arrow-right" />}
              ></VBtn>
            </div>
          )}
        >
          {tabOptions.value.map((option, tabIndex) => (
            <VTab
              key={option.value}
              baseColor={'grey-darken-1'}
              rounded={'t-lg'}
              {...option}
              v-slots={{
                append: () => {
                  return (
                    <div
                      class={'d-layout-tab-close'}
                      onClick={withModifiers(() => {
                        handleRemove(option, tabIndex)
                      }, ['stop'])}
                    >
                      <ShowSvg size={'10px'} name="close" />
                    </div>
                  )
                },
              }}
            >
              <div class={'d-layout-tab-text'}>{option.title}</div>
              <div class={'d-layout-tab-before'}></div>
              <div class={'d-layout-tab-after'}></div>
            </VTab>
          ))}
        </VTabs>
      )
    }
  },
})
