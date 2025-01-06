import { footballApi } from '../__mock__/api/footballApi';

export const footballService = {
  getAllListLeague: async () => {
    const footballMatches = await footballApi.getAllListLeague();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(footballMatches)
      }, 2000)
    })
  },
};
