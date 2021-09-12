const apiClient = {
  getHomes: async () => {
    return fetch(
      `https://run.mocky.io/v3/e1a44e4d-b879-48d2-b658-ff643f5319e9`
    ).then((response) => response.json());
  },
  bookHome: () => {
    return Promise.resolve();
  },
};

export default apiClient;
