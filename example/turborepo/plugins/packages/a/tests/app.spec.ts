import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('test a app.vue', () => {
  it('test', () => {
    const wrapper = mount(App)
    expect(!!wrapper.find('img')).toBeTruthy()
  })
})
