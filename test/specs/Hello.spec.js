import Vue from 'vue'
import Hello from 'components/Hello'

describe('Hello.vue', () => {
  let app, el

  beforeEach((done) => {
    app = new Vue({
      ...Hello
    }).$mount()
    app.$nextTick(() => {
      el = app.$el
      done()
    })
  })

  it('Initialises name', () => {
    expect(app.name).toBe('Hello')
  })

  it('Displays the name', (done) => {
    app.name = 'World'
    expect(el.querySelector('.hello h1').textContent).toEqual('Hello')
    app.$nextTick().then(() => {
      expect(el.querySelector('.hello h1').textContent).toEqual('World')
      done()
    })
  })
})
