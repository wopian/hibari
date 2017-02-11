import Vue from 'vue'
import App from '../client/components/App.vue'

describe('App.vue', () => {
  // asserting JavaScript options
  it('Should show notice component', () => {
    expect(App.data().showNotice).toBe(true)
  })

  it('should render correct message', () => {
    const vm = new Vue({
      el: '#app',
      render: h => h('set-title')
      // template: '<div><test></test></div>',
      // components: {
      //   'test': SetTitle
      // }
    }).$mount()

    expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello world')
  })
})
