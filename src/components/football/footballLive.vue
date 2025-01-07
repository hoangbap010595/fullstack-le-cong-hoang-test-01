<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Star, ChevronDown, FlagTriangleRight } from 'lucide-vue-next'
import { footballService } from '@/services/footballService'
import { useMatchSimulation } from '@/hooks/useMatchSimulation'
import LoadingSpinner from '@/components/shared/loading.vue'
import NoData from '@/components/shared/nodata.vue'
import FootballToolbar from './FootballToolbar.vue'

// Hooks
const { matches } = useMatchSimulation()

// Reactive states
const leagues = ref([])
const isLoading = ref(false)
const error = ref(null)
const currentFilter = ref('live')
const currentSearch = ref('')
const currentSort = ref('time')

// Computed
const hasMatches = computed(() => filteredLeagues.value.length > 0)
const totalMatches = computed(() => {
  return filteredLeagues.value.reduce((sum, league) => sum + league.games.length, 0)
})

const filteredLeagues = computed(() => {
  let dataLeagues =
    currentFilter.value === 'all' 
    ? leagues.value 
    : leagues.value.map(league => ({
        ...league,
        games: league.games.filter(game => {
          if (currentFilter.value === 'live') {
            return game.time !== 'FT'
          }
          if (currentFilter.value === 'finished') {
            return game.time === 'FT'
          }
          return true
        })
      })).filter(league => league.games.length > 0)

  if (currentSearch.value) {
    dataLeagues = dataLeagues.filter(league => league.league.toLowerCase().includes(currentSearch.value.toLowerCase()) || league.games.some(game => game.home_team.toLowerCase().includes(currentSearch.value.toLowerCase()) || game.away_team.toLowerCase().includes(currentSearch.value.toLowerCase())))
  }

  // Sort by time
  if (currentSort.value === 'time') {
    dataLeagues = dataLeagues.sort((a, b) => {
      const timeA = a.games[0].local_time.split(':').map(Number);
      const timeB = b.games[0].local_time.split(':').map(Number);
      // So sánh giờ trước
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      }
      // Nếu giờ bằng nhau, so sánh phút
      return timeA[1] - timeB[1];
    });
  }

  // Sort by league
  if (currentSort.value === 'league') {
    dataLeagues = dataLeagues.sort((a, b) => {
      return a.league.trim().toLowerCase().localeCompare(b.league.trim().toLowerCase());
    });
  }

  return dataLeagues
})

// Methods

// Fetch league data and show loading state for better UX
const fetchData = async () => {
  try {
    isLoading.value = true
    const response = await footballService.getAllListLeague()
    leagues.value = response.matches
  } catch (err) {
    error.value = err.message
    console.error('Error fetching matches:', err)
  } finally {
    isLoading.value = false
  }
}

const getStatusText = (time, status) => {
  if (time === 'HT' || time === 'FT') return status

  return time
}

const formatScore = (score) => {
  if (!score) return '-'

  const [homeScore, awayScore] = score.split('-').map(s => parseInt(s.trim()))

  return {
    home: {
      score: homeScore,
      class: homeScore > awayScore ? 'font-bold text-red-700' : 'font-semibold text-red-500'
    },
    away: {
      score: awayScore,
      class: awayScore > homeScore ? 'font-bold text-red-700' : 'font-semibold text-red-500'
    }
  }
}

// ============== Toolbar ==============
const handleFilterChange = (filter) => {
  currentFilter.value = filter
}

const handleSearch = (query) => {
  currentSearch.value = query
}

const handleSort = (sortType) => {
  currentSort.value = sortType
}

// Watch for changes in matches and update leagues
watch(matches, (newMatches) => {
  leagues.value = newMatches.matches
}, { deep: true })

// Lifecycle hooks
onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- Loading state -->
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>

  <!-- Error state -->
  <div v-else-if="error">{{ error }}</div>

  <!-- Data exists -->
  <div v-else>
    <FootballToolbar @filter-change="handleFilterChange" @search="handleSearch" @sort-change="handleSort" />

    <!-- No data state -->
    <div v-if="!hasMatches" class="no-data">
      <NoData />
    </div>
    <div v-else>
      <div v-for="(league, leagueIndex) in filteredLeagues" :key="league.league" class="border border-solid border-[#F1F1F1]">
        <!-- League Header -->
        <div class="flex items-center gap-3 p-3 bg-[#F1F1F1]">
          <button class="text-neutral-400 hover:text-yellow-400">
            <Star size="20" />
          </button>
          <h3 class="flex-1 font-semibold text-neutral-900 text-[15px]" :data-testid="`league-title-${leagueIndex}`">
            {{ league.league }}
          </h3>
          <button class="transition-colors text-neutral-600 hover:text-neutral-900 focus:outline-none">
            <ChevronDown size="18" />
          </button>
        </div>

        <!-- Games Container -->
        <div class="flex flex-col text-sm">
          <div v-for="(game, gameIndex) in league.games" :key="game.home_team" class="p-3 transition-shadow bg-white"
            :data-testid="`match-card-${leagueIndex}-${gameIndex}`">
            <div class="hidden md:grid grid-cols-[auto_80px_100px_1fr_160px] items-center gap-4">
              <button class="text-neutral-400 hover:text-yellow-400">
                <Star size="20" />
              </button>

              <p class="text-neutral-400">{{ game.local_time }}</p>
              <p class="font-semibold text-center text-red-500">{{ getStatusText(game.time, game.status) }}</p>

              <p class="grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-neutral-900">
                <span class="font-medium text-right">{{ game.home_team }}</span>
                <span class="flex items-center justify-center min-w-[60px]">
                  <span :class="formatScore(game.score).home.class">
                    {{ formatScore(game.score).home.score }}
                  </span>
                  <span class="mx-1 text-neutral-400"> - </span>
                  <span :class="formatScore(game.score).away.class">
                    {{ formatScore(game.score).away.score }}
                  </span>
                </span>
                <span class="font-medium text-left">{{ game.away_team }}</span>
              </p>

              <div class="flex items-center justify-end gap-3 text-neutral-400">
                <p class="flex items-center gap-1">
                  HT {{ game.score_half }}
                </p>
                <p class="flex items-center gap-1">
                  <FlagTriangleRight size="16" />
                  <span>{{ game.corner }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end p-4 bg-[#F1F1F1] border-t border-[#F1F1F1]">
        <p class="text-sm font-medium text-gray-600">
          Tổng số trận: <span class="font-bold text-gray-900">{{ totalMatches }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
