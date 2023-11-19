import { User } from '@/types/types';
import { Commit } from 'vuex'
import { swapiService } from '@/api/swapiSerwise';

interface State {
  users: User[]
  searchTerm: string
  isLoading: boolean
}

export default {  
  namespaced: true,
  
  state: () => ({
    users: [] as User[],
    isLoading: false,
    searchTerm: ''
  }),

  mutations: {
    SET_USERS(state: State, payload: User[]) {
      state.users = payload;
    },
    SET_LOADING(state: State, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_SEARCH_TERM(state: State, term: string) {
      state.searchTerm = term;
    },
    APPEND_USERS(state: State, payload: User[]) {
      state.users = [...state.users, ...payload];
    },
  },
  actions: {
    async fetchUsers({ commit }: {commit: Commit}) {
      commit('SET_LOADING', true);
      try {
        const response = await swapiService.getUsers();
        commit('SET_USERS', response);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    setSearchTerm({ commit }: {commit: Commit}, term: string) {
      commit('SET_SEARCH_TERM', term);
    },
  },
  getters: {
    usersData: (state: State) => {
      if (!state.users || state.users.length === 0) return [];
      return state.users.map(user => ({
        ...user,
        height: user.height !== 'unknown' ? parseFloat(user.height) : null,
        mass: user.mass !== 'unknown' ? parseFloat(user.mass) : null,
        created: new Date(user.created),
        edited: new Date(user.edited),
      }));
    },
    searchTerm: (state: State) => state.searchTerm,
    isLoading: (state: State) => state.isLoading
  }
};