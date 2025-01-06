import { footballService } from "../footballService"
import { footballApi } from "../../__mock__/api/footballApi"

// Mock the footballApi
jest.mock("../../__mock__/api/footballApi")

describe("footballService", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe("getAllListLeague", () => {
		it("should return football matches after 2 seconds", async () => {
			// Arrange
			const mockMatches = [
				{ id: 1, name: "Match 1" },
				{ id: 2, name: "Match 2" },
			]

			;(footballApi.getAllListLeague).mockResolvedValue(mockMatches)

			// Act
			const startTime = Date.now()
			const result = await footballService.getAllListLeague()
			const endTime = Date.now()

			// Assert
			expect(result).toEqual(mockMatches)
			expect(footballApi.getAllListLeague).toHaveBeenCalledTimes(1)

			// Verify the delay is approximately 2000ms
			const timeElapsed = endTime - startTime

       // Allow small margin of error
			expect(timeElapsed).toBeGreaterThanOrEqual(1900)
			expect(timeElapsed).toBeLessThanOrEqual(2100)
		})

		it("should handle API errors", async () => {
			// Arrange
			const error = new Error("API Error")
			;(footballApi.getAllListLeague).mockRejectedValue(error)

			// Act & Assert
			await expect(footballService.getAllListLeague()).rejects.toThrow("API Error")
			expect(footballApi.getAllListLeague).toHaveBeenCalledTimes(1)
		})
	})
})
