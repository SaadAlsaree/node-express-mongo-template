import express, { type Express } from 'express';

import { SetupServer } from '@root/setup-server';
import { config } from '@root/config';
import databaseConnection from '@root/setup-database';

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: SetupServer = new SetupServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
    config.cloudinaryConfig();
  }
}

const application: Application = new Application();
application.initialize();
