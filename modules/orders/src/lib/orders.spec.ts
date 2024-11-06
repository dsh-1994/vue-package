import { mount } from '@vue/test-utils'
import Orders from './orders.vue'
import { describe, expect, it } from 'vitest'

describe('Orders', () => {
  it('renders properly', () => {
    const wrapper = mount(Orders, {})
    expect(wrapper.text()).toContain('Welcome to Orders')
  })
})
