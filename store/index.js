export const state = () => ({
  userName: 'guest'
});

export const mutations = {
  setDisplayName(state, user) {
    state.userName = user
  }
};
