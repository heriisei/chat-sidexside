import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ChatWindow from '../src/components/ChatWindow.vue'

describe('ChatWindow.vue', () => {
  it('should render the left window', () => {
    const wrapper = mount(ChatWindow, { props: { side: 'west' } })
    expect(wrapper.find('h2').exists()).toBe(true)
  })

  it('should render the right window', () => {
    const wrapper = mount(ChatWindow, { props: { side: 'east' } })
    expect(wrapper.find('h2').exists()).toBe(true)
  })
})
