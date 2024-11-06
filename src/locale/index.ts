import { createI18n } from 'vue-i18n'
import en from './en'
import zhCn from './zh-cn'

// 国际化
export default createI18n({
  legacy: false,
  locale: 'zh-cn',
  fallbackLocale: 'en',
  messages: {
    en: en,
    'zh-cn': zhCn,
  },
})
