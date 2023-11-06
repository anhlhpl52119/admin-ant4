interface User {
  id: string
}
export const useDevStore = defineStore('development', {
  state: () => {
    return {
      users: [] as User[],
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    };
  },

  getters: {
    getUserById: (state) => {
      return (userId: string) => state.users.find(user => user.id === userId);
    },
  },
  actions: {
    randomUser: () => {
      this.users++;
    },
  },
});
