import { createStore } from 'vuex';
import users from './modules/users';
import planets from './modules/planets';

export default createStore({
  modules: {
    users,
    planets
  }
});
