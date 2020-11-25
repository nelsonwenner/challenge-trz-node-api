import { Server } from '@src/Server';
import supertest from 'supertest';

let server: Server;

beforeAll(async () => {
  server = new Server();
  server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => await server.close());
