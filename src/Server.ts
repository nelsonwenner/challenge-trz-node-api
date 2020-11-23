import './utils/module-alias';
import Express, { Application } from 'express';
import cors from 'cors';

export class Server {
  private readonly app: Application;

  constructor(private port = 3333) {
    this.app = Express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(cors({ origin: '*' }));
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info(`\nServer start with successfully on PORT ${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
