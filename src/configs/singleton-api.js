export class ApiSingleton {
  constructor(instance) {
    this.instance = instance;
  }

  static getInstance() {
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = new ApiSingleton({ apiUrl: process.env.API_URL });
    }
    return ApiSingleton.instance;
  }
}
