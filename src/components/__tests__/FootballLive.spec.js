import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import FootballLive from "../footballLive.vue"
import { leagueList } from "@/__mock__/data/football"

describe("FootballLive", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.clearAllTimers()
  })

  it("renders properly", () => {
    const wrapper = mount(FootballLive)
    expect(wrapper.exists()).toBe(true)
  })

	it("displays match data correctly", async () => {
		const wrapper = mount(FootballLive)
		wrapper.vm.leagues = leagueList

		jest.runAllTimers()
		await nextTick()

		leagueList.matches.forEach((league, leagueIndex) => {
			expect(wrapper.find(`[data-testid="league-title-${leagueIndex}"]`).text()).toContain(league.league)

			league.games.forEach((match, matchIndex) => {
				const matchCard = wrapper.find(`[data-testid="match-card-${leagueIndex}-${matchIndex}"]`)
				expect(matchCard.find(".match-title").text()).toContain([match.home_team, "vs", match.away_team].join(" "))
				expect(matchCard.find(".score").text()).toContain(match.score)
				expect(matchCard.find(".time").text()).toContain(match.time)
				expect(matchCard.find(".status").text()).toContain(match.status)
			})
		})

		// Check total matches
		const totalMatches = leagueList.matches.reduce((sum, league) => sum + league.games.length, 0)
		const matchElements = wrapper.findAll(".match-card")
		expect(matchElements.length).toBe(totalMatches)
	})
})
