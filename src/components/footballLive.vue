<script setup>
import { Star, ChevronDown, FlagTriangleRight } from 'lucide-vue-next'
</script>

<template>
  <div>
    <div 
        v-for="(league, leagueIndex) in leagues.matches" 
        :key="league.league" 
        class="">
      <!-- League Header -->
      <div class="flex items-center justify-between gap-2 p-3 bg-gray-800">
        <button class="text-yellow-400 transition-colors hover:text-yellow-300">
          <Star size="20" />
        </button>
        <h3 class="flex-1 font-bold text-white" :data-testid="`league-title-${leagueIndex}`">
          {{ league.league }}
        </h3>
        <button class="text-white">
          <ChevronDown size="20" />
        </button>
      </div>

      <!-- Games Container -->
      <div class="flex flex-col text-sm">
        <div
            v-for="(game, gameIndex) in league.games" 
            :key="game.home_team"
            class="p-3 transition-shadow bg-gray-100"
            :data-testid="`match-card-${leagueIndex}-${gameIndex}`">
          <div class="hidden md:grid grid-cols-[auto_80px_60px_1fr_160px] items-center gap-4">
            <button class="text-gray-400 transition-colors hover:text-yellow-400">
              <Star size="20" />
            </button>

            <p class="text-gray-400">{{ game.local_time }}</p>
            <p class="text-gray-400">{{ game.time }}</p>
            
            <p class="flex items-center justify-center text-gray-400">
              <span class="font-medium">{{ game.home_team }}</span> 
              <span class="mx-2 font-bold">{{ game.score }}</span>
              <span class="font-medium">{{ game.away_team }}</span>
            </p>

            <div class="flex items-center justify-end gap-3">
              <p class="flex items-center gap-1 text-gray-400">
                HT {{ game.score_half }}
              </p>
              <p class="flex items-center gap-1 text-gray-400">
                <FlagTriangleRight size="16" />
                <span>{{ game.corner }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { footballService } from '@/services/footballService';

export default {
  name: 'FootballLive',
  data() {
    return {
      leagues: [],
      isLoading: false,
      error: null,
    };
  },
  computed: {
    hasMatches() {
      return this.leagues.length > 0;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        this.leagues = await footballService.getAllListLeague();
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching matches:', error);
      } finally {
        this.isLoading = false;
      }
    },

    getStatusText(status) {
      return status;
    },
  },
};
</script>
