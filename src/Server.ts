import './utils/module-alias';
import * as database from '@src/config/database/database';
import Express, { Application } from 'express';
import router from './routes/indexRouter';
import * as http from 'http';
import cors from 'cors';
import 'dotenv/config';

export class Server {
  private readonly app: Application;
  private server?: http.Server;

  constructor(private port = process.env.PORT) {
    this.app = Express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.setupDatabase();
  }

  public getApp(): Application {
    return this.app;
  }

  public getServer(): http.Server | undefined {
    return this.server;
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(cors({ origin: '*' }));
    router.forEach((route) => this.app.use(route));
  }

  private async setupDatabase(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(null);
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info(`\nServer start with successfully on PORT ${this.port}`);
    });
  }
}
