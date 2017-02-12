import { Vue, router, store } from '../config/vue'
import App from 'components/App'

describe('App.vue', () => {
  describe('Data', () => {
    it('showNotice defaults to true', () => {
      expect(App.data().showNotice).toBe(true)
    })
  })

  describe('DOM', () => {
    const app = new Vue({
      router,
      store,
      ...App
    }).$mount()

    it('contains header', () => {
      expect(app.$el.querySelectorAll('#app > header').length).toEqual(1)
    })
    it('contains [notice]', () => {
      expect(app.$el.querySelectorAll('#app > [notice]').length).toEqual(1)
    })
    it('contains main', () => {
      expect(app.$el.querySelectorAll('#app > main').length).toEqual(1)
    })
    it('contains footer', () => {
      expect(app.$el.querySelectorAll('#app > footer').length).toEqual(1)
    })
    it('contains no other direct children', () => {
      expect(app.$el.querySelectorAll('#app > *:not(header):not(footer):not([notice]):not(main)').length).toEqual(0)
    })
  })
})
