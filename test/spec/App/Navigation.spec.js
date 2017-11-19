import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Navigation from '@/components/App/Navigation'

describe('Navigation.vue', () => {
  it('renders navigation', () => {
    const wrapper = shallow(Navigation)

    expect(wrapper).toBe(true)
  })
})
