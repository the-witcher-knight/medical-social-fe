export class ApiSingleton {
  constructor(instance) {
    this.instance = instance;
  }

  static getInstance() {
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = new ApiSingleton({
        apiUrl: process.env.API_URL,
        host: process.env.HOST,
        baseUrl: process.env.BASE_URL,
      });
    }
    return ApiSingleton.instance;
  }
}
