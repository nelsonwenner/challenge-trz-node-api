import './utils/module-alias';
import 'express-async-errors';
import * as database from '@src/config/database/database';
import errorHandler from './utils/error-handler';
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
    this.app.use(errorHandler);
  }

  private async setupDatabase(): Promise<void> {
    const conn = await database.connect();
    conn.isConnected && console.log(`🚀 Database start with successfully`);
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
      console.info(`🚀 Server start with successfully on PORT ${this.port}`);
    });
  }
}
