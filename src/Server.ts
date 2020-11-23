import './utils/module-alias';
import Express, { Application } from 'express';
import * as http from 'http';
import cors from 'cors';
import 'dotenv/config';

export class Server {
  private readonly app: Application;
  private server?: http.Server;

  constructor(private port = process.env.SERVER_PORT) {
    this.app = Express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(cors({ origin: '*' }));
  }

  public getApp(): Application {
    return this.app;
  }

  public async close(): Promise<void> {
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
