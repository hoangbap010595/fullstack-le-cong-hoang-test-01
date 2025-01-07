import { mount } from '@vue/test-utils'
import FootballToolbar from '../FootballToolbar.vue'

describe('FootballToolbar.vue', () => {
  it('renders correctly with default state', () => {
    const wrapper = mount(FootballToolbar)
    
    // Check if all filter buttons are rendered
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
    
    // Check if search input exists
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    
    // Check if sort select exists
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('emits filter-change event when filter is clicked', async () => {
    const wrapper = mount(FootballToolbar)
    
    // Click the "All" filter button
    const allButton = wrapper.findAll('button')[0]
    await allButton.trigger('click')
    
    // Check if the correct event was emitted
    expect(wrapper.emitted('filter-change')).toBeTruthy()
    expect(wrapper.emitted('filter-change')[0]).toEqual(['all'])
  })

  it('emits search event when input changes', async () => {
    const wrapper = mount(FootballToolbar)
    
    const searchInput = wrapper.find('input[type="text"]')
    await searchInput.setValue('test search')
    
    // Check if the search event was emitted with correct value
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['test search'])
  })

  it('emits sort-change event when sort option changes', async () => {
    const wrapper = mount(FootballToolbar)
    
    const select = wrapper.find('select')
    await select.setValue('time')
    
    // Check if the sort-change event was emitted with correct value
    expect(wrapper.emitted('sort-change')).toBeTruthy()
    expect(wrapper.emitted('sort-change')[0]).toEqual(['time'])
  })

  it('updates active filter styling when filter is changed', async () => {
    const wrapper = mount(FootballToolbar)
    
    // Initially 'live' should be active
    expect(wrapper.findAll('button')[1].classes()).toContain('bg-red-700')
    
    // Click the "All" filter
    await wrapper.findAll('button')[0].trigger('click')
    
    // Now 'all' should be active
    expect(wrapper.findAll('button')[0].classes()).toContain('bg-red-700')
    expect(wrapper.findAll('button')[1].classes()).toContain('bg-gray-100')
  })
}) 