import { mount } from '@vue/test-utils'
import Ui from './ui.vue'
import { describe, expect, it } from 'vitest'

describe('Ui', () => {
  it('renders properly', () => {
    const wrapper = mount(Ui, {})
    expect(wrapper.text()).toContain('Welcome to Ui')
  })
})
