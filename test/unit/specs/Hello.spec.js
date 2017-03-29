import Vue from 'vue'
import Hello from 'client/components/Hello'

const Constructor = Vue.extend(Hello)
const vm = new Constructor().$mount()

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toBe('Welcome to Your Vue.js App')
  })

  it('renders to a nice snapshot', () => {
    const renderer = require('vue-server-renderer').createRenderer()
    renderer.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})
