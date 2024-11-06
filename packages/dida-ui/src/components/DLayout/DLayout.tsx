import { defineComponent, toRaw, ref, watch } from 'vue'
import './DLayout.scss'
import {
  VApp,
  VAppBar,
  VAppBarTitle,
  VBtn,
  VMain,
  VNavigationDrawer,
} from 'vuetify/components'
import {
  DLayoutMenu,
  DLayoutMenuEmitsT,
  DLayoutMenuPropsT,
} from './DLayoutMenu'
import { useVModel } from '@vueuse/core'
import config from '../../styles/theme.module.scss'
import {
  DLayoutTabsEmitsT,
  DLayoutTabsPropsT,
  type DLayoutTabOptions,
} from './DLayoutTabs'
import { DLayoutTabs } from './DLayoutTabs'
import ShowSvg from 'show-svg'

export const DLayoutPropsT = {
  ...DLayoutMenuPropsT,
  ...DLayoutTabsPropsT,
} as const
export const DLayoutEmitsT = {
  ...DLayoutMenuEmitsT,
  ...DLayoutTabsEmitsT,
}
// export type DLayoutExposeT = {
//   addTabOption: (option: DLayoutTabOption) => boolean // false 表示新增失败
// }

export const DLayout = defineComponent({
  name: 'DLayout',
  props: DLayoutPropsT,
  emits: DLayoutEmitsT,
  setup(props, { slots, emit }) {
    const drawer = ref(true) // 展开/收起

    // menu ------ start
    // 内置状态，变更时也会发送出去
    const menuOpened = ref<string[]>([])
    const menuSelected = ref<string[]>([])
    watch(
      () => menuOpened.value,
      value => {
        emit('update:menuOpened', toRaw(value))
      },
    )
    watch(
      () => menuSelected.value,
      value => {
        emit('update:menuSelected', toRaw(value))
      },
    )
    // 联合状态
    const menuOpenedModel =
      props.menuOpened === undefined
        ? menuOpened
        : useVModel(props, 'menuOpened', emit)
    const menuSelectedModel =
      props.menuSelected === undefined
        ? menuSelected
        : useVModel(props, 'menuSelected', emit)
    // menu ------ end

    // tab ------ start
    // 内置状态，变更时也会发送出去
    const tabOptions = ref<DLayoutTabOptions>([])
    const tabSelectValue = ref<string>('')
    watch(
      () => tabOptions.value,
      value => {
        emit('update:tabOptions', toRaw(value))
      },
    )
    watch(
      () => tabSelectValue.value,
      value => {
        emit('update:tabSelectValue', value)
      },
    )
    // 联合状态
    const tabOptionsModel =
      props.tabOptions === undefined
        ? tabOptions
        : useVModel(props, 'tabOptions', emit)
    const tabSelectValueModel =
      props.tabSelectValue === undefined
        ? tabSelectValue
        : useVModel(props, 'tabSelectValue', emit)
    // 内置新增tab功能
    // function addTabOption(option: DLayoutTabOption) {
    //   console.log('option', option, tabOptionsModel.value)
    //   // previewFileList.value = urlToFilelist(urls);
    //   return false
    // }
    // tab ------ end

    // expose<DLayoutExposeT>({
    //   addTabOption,
    // })

    return () => {
      return (
        <VApp class={'d-layout'}>
          <VNavigationDrawer
            v-model={drawer.value}
            floating
            v-slots={{
              prepend: () => (
                <div
                  class={'d-layout-prepend'}
                  style={{ height: `${props.headerHeight}px` }}
                >
                  <div class={'d-layout-prepend-inner rounded-lg'}>
                    <VBtn
                      class={{
                        'd-layout-anime-flip': !drawer.value,
                      }}
                      active
                      color={config['--light-color']}
                      rounded={'lg'}
                      size={'small'}
                      variant="text"
                      icon={() => (
                        <ShowSvg
                          size={'20px'}
                          color={config['--light-color']}
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
            <div class={'d-layout-menu'}>
              <div
                class={'d-layout-menu-logo'}
                style={{ height: `${props.headerHeight}px` }}
              >
                <div class={'d-layout-menu-logo-inner'}>{slots.logo?.()}</div>
              </div>
              <div class={'d-layout-menu-content'}>
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
              <div class={'d-layout-tabs-wrapper'}>
                <VAppBarTitle>
                  <div class={'d-layout-tabs'}>
                    <DLayoutTabs
                      headerHeight={props.headerHeight}
                      v-model:tabOptions={tabOptionsModel.value}
                      v-model:tabSelectValue={tabSelectValueModel.value}
                      onDelete:tabOption={(...args) => {
                        emit('delete:tabOption', ...args)
                      }}
                    />
                  </div>
                </VAppBarTitle>
                {props.tabShowMenu ? (
                  <div class={'d-layout-tabs-menu'}>{slots.menu?.()}</div>
                ) : null}
              </div>
            </VAppBar>
          ) : null}

          <VMain style={{ backgroundColor: config['--light-bg-color'] }}>
            {slots.default?.()}
          </VMain>
        </VApp>
      )
    }
  },
})
