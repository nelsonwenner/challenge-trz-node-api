import './utils/module-alias';
import 'express-async-errors';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { OpenApiValidator } from 'express-openapi-validator';
import * as database from '@src/config/database/database';
import errorHandler from './utils/error-handler';
import Express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import router from './routes/indexRouter';
import apiSchema from './api-schema.json';
import logger from './logger';
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
    await this.docsSetup();
    await this.setupDatabase();
  }

  public getApp(): Application {
    return this.app;
  }

  public getServer(): http.Server {
    return this.server;
  }

  private setupExpress(): void {
    this.app.use(Express.json());
    this.app.use(cors({ origin: '*' }));
    router.forEach((route) => this.app.use(route));
    this.app.use(errorHandler);
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    await new OpenApiValidator({
      apiSpec: (apiSchema as unknown) as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
  }

  private async setupDatabase(): Promise<void> {
    const conn = await database.connect();
    conn.isConnected && logger.info(`🚀 Database start with successfully`);
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
      logger.info(`🚀 Server start with successfully on PORT ${this.port}`);
    });
  }
}
