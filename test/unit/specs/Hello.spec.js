import Vue from 'vue'
import Hello from 'client/components/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toBe('Welcome to Your Vue.js App')
  })

  it('renders to a nice snapshot', () => {
    const renderer = require('vue-server-renderer').createRenderer()
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})
