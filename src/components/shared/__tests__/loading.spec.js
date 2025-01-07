import { mount } from "@vue/test-utils"
import LoadingSpinner from "../loading.vue"

describe("LoadingSpinner", () => {
	it("renders correctly", () => {
		const wrapper = mount(LoadingSpinner)

		// Check if the container exists with correct test id
		expect(wrapper.attributes("data-testid")).toBe("loading-container")

		// Check if all three circles are rendered
		const circles = wrapper.findAll(".circle")
		expect(circles).toHaveLength(3)

		// Check if loading text is present and correct
		const loadingText = wrapper.find(".loading-text")
		expect(loadingText.exists()).toBe(true)
		expect(loadingText.text()).toBe("Loading data...")
	})

	it("has correct styling applied", () => {
		const wrapper = mount(LoadingSpinner)

		// Check if container has flex display
		const container = wrapper.find(".loading-container")
		expect(container.classes()).toContain("loading-container")

		// Check if spinner has flex display
		const spinner = wrapper.find(".loading-spinner")
		expect(spinner.classes()).toContain("loading-spinner")
	})
})
