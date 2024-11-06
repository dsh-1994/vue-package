import 'vue/jsx-runtime'
import type { HTMLAttributes } from 'vue'

declare module 'vue/jsx-runtime' {
  namespace JSX {
    interface IntrinsicAttributes extends HTMLAttributes {}
  }
}
