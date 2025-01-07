import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import FootballLive from "../footballLive.vue"
import { useMatchSimulation } from '@/hooks/useMatchSimulation'
import { footballService } from '@/services/footballService'

// Mock data
const mockLeagueList = {
  matches: [
    {
      league: "Premier League",
      games: [
        {
          home_team: "Arsenal",
          away_team: "Chelsea",
          score: "2 - 1",
          time: "45'",
          status: "First Half",
          local_time: "19:30",
          score_half: "1 - 0",
          corner: "5 - 0"
        }
      ]
    }
  ]
}

// Mock hooks
jest.mock('@/hooks/useMatchSimulation', () => ({
  useMatchSimulation: jest.fn()
}))

// Mock service
jest.mock('@/services/footballService', () => ({
  footballService: {
    getAllListLeague: jest.fn()
  }
}))

describe("FootballLive", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
    jest.useFakeTimers()
    useMatchSimulation.mockReturnValue({
      matches: { matches: [] }
    })
    footballService.getAllListLeague.mockResolvedValue(mockLeagueList)
  })

  it("renders properly", () => {
    const wrapper = mount(FootballLive)
    expect(wrapper.exists()).toBe(true)
  })

  it("shows loading state initially", async () => {
    const wrapper = mount(FootballLive)

    await nextTick()
    expect(wrapper.findComponent({ name: 'LoadingSpinner' }).exists()).toBe(true)
  })

  it("shows nodata state initially", async () => {
    const wrapper = mount(FootballLive)

    expect(wrapper.findComponent({ name: 'NoData' }).exists()).toBe(true)
  })

  it("fetches and displays match data correctly", async () => {
    const wrapper = mount(FootballLive)
    await nextTick()

    // Wait for loading to complete
    await wrapper.vm.$nextTick()

    // Check league title
    expect(wrapper.find('[data-testid="league-title-0"]').text()).toContain('Premier League')

    // Check match details
    const matchCard = wrapper.find('[data-testid="match-card-0-0"]')
    expect(matchCard.exists()).toBe(true)
    expect(matchCard.text()).toContain(['19:30', "45'", 'Arsenal', '2 - 1', 'Chelsea', ' HT ', '1 - 0', '5 - 0'].join(''))
  })

  it("formats score correctly", async () => {
    const wrapper = mount(FootballLive)
    await nextTick()

    const formattedScore = wrapper.vm.formatScore('2-1')
    expect(formattedScore).toEqual({
      home: {
        score: 2,
        class: 'font-bold text-red-700'
      },
      away: {
        score: 1,
        class: 'font-semibold text-red-500'
      }
    })
  })

  it("handles error state", async () => {
    const errorMessage = "Failed to fetch data"
    footballService.getAllListLeague.mockRejectedValue(new Error(errorMessage))

    const wrapper = mount(FootballLive)
    
    await nextTick() // Wait for reactive data update
    await wrapper.vm.$nextTick() // Wait for DOM update

    expect(wrapper.text()).toContain(errorMessage)
  })

  it("updates matches when simulation data changes", async () => {
    const wrapper = mount(FootballLive)
    
    // Simulate match update
    useMatchSimulation.mockReturnValue({
      matches: mockLeagueList
    })

    await nextTick() // Wait for reactive data update
    await wrapper.vm.$nextTick() // Wait for DOM update

    expect(wrapper.find('[data-testid="league-title-0"]').text()).toContain('Premier League')
  })

  it("displays correct status text", () => {
    const wrapper = mount(FootballLive)
    
    expect(wrapper.vm.getStatusText('HT', 'Half Time')).toBe('Half Time')
    expect(wrapper.vm.getStatusText('45', 'First Half')).toBe('45')
  })

  it("calculates total matches correctly", async () => {
    const wrapper = mount(FootballLive)
    await nextTick()
    
    wrapper.vm.leagues = mockLeagueList.matches
    await nextTick()

    expect(wrapper.text()).toContain('Tổng số trận: 1')
  })
})
