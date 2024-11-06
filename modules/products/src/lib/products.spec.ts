import { mount } from '@vue/test-utils'
import Products from './products.vue'
import { describe, expect, it } from 'vitest'

describe('products', () => {
  it('renders properly', () => {
    const wrapper = mount(Products, {})
    expect(wrapper.text()).toContain('Welcome to Products')
  })
})
