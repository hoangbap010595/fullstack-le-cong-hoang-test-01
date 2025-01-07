import { mount } from '@vue/test-utils'
import NoData from '../nodata.vue'

describe('NoData', () => {
  it('renders default content correctly', () => {
    const wrapper = mount(NoData)
    
    // Check if container exists
    expect(wrapper.attributes('data-testid')).toBe('no-data-container')
    
    // Check default title
    expect(wrapper.find('.title').text()).toBe('No Data Available')
    
    // Check default description
    expect(wrapper.find('.description').text()).toBe('There are no items to display at the moment.')
    
    // Check if default icon exists
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders custom content through slots', () => {
    const wrapper = mount(NoData, {
      slots: {
        title: 'Custom Title',
        description: 'Custom Description',
        icon: '<span class="custom-icon">🔍</span>',
        action: '<button>Custom Action</button>'
      }
    })

    // Check custom title
    expect(wrapper.find('.title').text()).toBe('Custom Title')
    
    // Check custom description
    expect(wrapper.find('.description').text()).toBe('Custom Description')
    
    // Check custom icon
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    
    // Check action slot
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Custom Action')
  })

  it('does not render action section when no action slot is provided', () => {
    const wrapper = mount(NoData)
    expect(wrapper.find('.action').exists()).toBe(false)
  })
})