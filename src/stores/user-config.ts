import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserConfigStore = defineStore('UserConfig', () => {
  // 多语言下拉
  const languageList = reactive([
    { title: '简体中文', value: 'zh-cn' },
    { title: 'English', value: 'en' },
  ])

  // 个人中心下拉
  const menuList = reactive([
    { title: '', value: 'hello' },
    { title: '', value: 'personalCenter' },
    { title: '', value: 'logOut' },
  ])

  // 用户信息
  const useInfo = reactive({ zhCnName: '黄昱', enName: 'Cathy' })

  return { languageList, menuList, useInfo }
})
