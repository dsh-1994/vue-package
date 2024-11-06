import { computed, defineComponent } from 'vue'

const ShowSvgPropsT = {
  size: {
    type: String,
    default: '16px',
  },
  color: {
    type: String,
  },
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    default: '',
  },
} as const

export const ShowSvg = defineComponent({
  name: 'ShowSvg',
  props: ShowSvgPropsT,
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    return () => {
      return (
        <svg
          aria-hidden="true"
          class="svg-icon"
          style={{ height: props.size, width: props.size }}
        >
          <use xlinkHref={symbolId.value} color={props.color}></use>
        </svg>
      )
    }
  },
})
