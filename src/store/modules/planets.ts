import { Planet } from '@/types/types';
import { swapiService } from '@/api/swapiSerwise';

import { Commit } from 'vuex';

interface State {
  planets: Record<string, Planet>;
}

export default {
  namespaced: true,

  state: () => ({
    planets: {} as Record<string, Planet>
  }),

  mutations: {
    SET_PLANET(state: State, { url, data }: { url: string; data: Planet }) {
      state.planets[url] = data;
    }
  },
  actions: {
    async fetchPlanet({ commit, state }: {commit: Commit, state: State}, url: string) {
      if (state.planets[url]) return state.planets[url];
  
      try {
        const response = await swapiService.getPlanet(url);
        commit('SET_PLANET', { url, data: response });
      } catch (error) {
        console.error('Error fetching planet:', error);
      }
    },
  },

  getters: {
    planet: (state: State) => (url: string) => state.planets[url],
  }
};
