import { leagueList } from '../data/football';

export const footballApi = {
  getAllListLeague: () => Promise.resolve(leagueList),
};
