<template>
  <div>
    <div v-for="(league, leagueIndex) in leagues.matches" :key="league.league" class="league-section">
      <h2 class="league-title" :data-testid="`league-title-${leagueIndex}`">{{ league.league }}</h2>

      <div
        v-for="(game, gameIndex) in league.games" :key="game.home_team" class="match-card"
        :data-testid="`match-card-${leagueIndex}-${gameIndex}`">
        <h3 class="match-title">{{ game.home_team }} vs {{ game.away_team }}</h3>
        <p class="score">{{ game.score }}</p>
        <p class="time">{{ game.time }}</p>
        <p class="status">{{ game.status }}</p>
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

<style lang="scss" scoped>
div {
  margin: 1rem 0;
}

.league-section {
  margin-bottom: 2rem;
}

.league-title {
  background-color: #f5f5f5;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.match-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;

  h3 {
    margin-bottom: 0.5rem;
  }

  .score {
    font-size: 1.2rem;
    font-weight: bold;
    color: #00613f;
  }

  .time,
  .status {
    color: #666;
    font-size: 0.9rem;
  }
}
</style>
