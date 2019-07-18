export const state = () => ({
  userName: null
});

export const mutations = {
  setDisplayName(state, user) {
    state.userName = user
  }
};
