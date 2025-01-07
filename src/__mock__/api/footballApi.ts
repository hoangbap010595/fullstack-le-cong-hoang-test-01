import { leagueList, simulateMatchUpdates } from '../data/football';

export const footballApi = {
  getAllListLeague: () => Promise.resolve(leagueList),
  getAllListLeagueRealTime: (data) => Promise.resolve(simulateMatchUpdates(data)),
};
