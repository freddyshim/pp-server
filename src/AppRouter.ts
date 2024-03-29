import express from 'express';

export class AppRouter {
  private static _instance: express.Router;

  static get instance(): express.Router {
    if (!AppRouter._instance) {
      AppRouter._instance = express.Router();
    }

    return AppRouter._instance;
  }
}
