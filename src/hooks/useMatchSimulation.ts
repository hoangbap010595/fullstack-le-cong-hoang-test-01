import { ref, onMounted, onUnmounted } from 'vue'
import { leagueList } from '../__mock__/data/football'
import { footballService } from '../services/footballService'

export const useMatchSimulation = (interval = 10000) => {
  const matches = ref(leagueList)
  const timer = ref < number | null > (null)

  const startSimulation = async () => {
    try {
      const response = await footballService.getAllListLeagueRealTime(matches.value)
      matches.value = response
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    }
  }

  onMounted(() => {
    // Start periodic updates
    timer.value = window.setInterval(startSimulation, interval)
  })

  onUnmounted(() => {
    if (timer.value) {
      window.clearInterval(timer.value)
      timer.value = null
    }
  })

  return {
    matches
  }
} 