import { CLUSTER as CLUSTER_PREF, NAMESPACES } from '@/store/prefs';
import SYSTEM_NAMESPACES from '@/config/system-namespaces';
import { preloadHandlers, switchHandlers } from '@/config/clusters';

export const plugins = [];

export const state = () => {
  return {
    preloaded:  false,
    namespaces: [],
  };
};

export const getters = {
  multipleNamespaces(state, getters) {
    return state.namespaces.length !== 1;
  },

  namespaces(state) {
    const namespaces = state.namespaces;

    if ( namespaces.length ) {
      return namespaces;
    } else {
      return SYSTEM_NAMESPACES.map(x => `!${ x }`);
    }
  },

  preloaded(state) {
    return state.preloaded === true;
  },
};

export const mutations = {
  preloaded(state) {
    state.preloaded = true;
  },

  updateNamespaces(state, neu) {
    state.namespaces = neu;
  },

  updateCluster(state, neu) {
    state.cluster = neu;
  },
  unloaded(state) {
    state.preloaded = false;
  }
};

export const actions = {

  async switchCluster(ctx) {
    const { commit } = ctx;

    await Promise.all(switchHandlers(ctx));
    commit('unloaded');
  },

  async preload(ctx) {
    const {
      state, getters, commit, dispatch
    } = ctx;

    if ( state.preloaded ) {
      return;
    }

    console.log('Preloading...');

    await Promise.all([
      ...preloadHandlers(ctx),
      dispatch('prefs/loadCookies'),
    ]);

    commit('updateNamespaces', getters['prefs/get'](NAMESPACES));
    commit('preloaded');

    console.log('Done Preloading.');
  },

  switchNamespaces({ commit }, val) {
    commit('prefs/set', { key: NAMESPACES, val });
    commit('updateNamespaces', val);
  },

  switchClusters({ commit }, val) {
    commit('prefs/set', { key: CLUSTER_PREF, val });
    commit('updateCluster', val);
  },

  nuxtServerInit(ctx, nuxt) {
    // Models in SSR server mode have no way to get to the route or router, so hack one in...
    Object.defineProperty(ctx.rootState, '$router', { value: nuxt.app.router });
    Object.defineProperty(ctx.rootState, '$route', { value: nuxt.route });
  },

  nuxtClientInit() {
  }
};
