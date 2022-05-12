export class ApiSingleton {
  constructor(instance) {
    this.instance = instance;
  }

  static getInstance() {
    // eslint-disable-next-line no-debugger
    debugger;
    if (!ApiSingleton.instance) {
      ApiSingleton.instance = new ApiSingleton({ apiUrl: process.env.API_URL });
    }
    return ApiSingleton.instance;
  }
}
