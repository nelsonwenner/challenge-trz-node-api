import { connect } from '@src/config/database/database';
import { Connection } from 'typeorm';
import { Server } from '@src/Server';
import supertest from 'supertest';

let connection: Connection;
let server: Server;

beforeAll(async () => {
  server = new Server();
  server.init();
  global.testRequest = supertest(server.getApp());

  connection = await connect('tes-connection');

  await connection.query('DROP TABLE IF EXISTS flags');
  await connection.query('DROP TABLE IF EXISTS locations');
  await connection.query('DROP TABLE IF EXISTS resources');
  await connection.query('DROP TABLE IF EXISTS items');
  await connection.query('DROP TABLE IF EXISTS inventories');
  await connection.query('DROP TABLE IF EXISTS survivors');
  await connection.query('DROP TABLE IF EXISTS migrations');

  await connection.runMigrations();
});

beforeEach(async () => {
  await connection.query('DELETE FROM flags');
  await connection.query('DELETE FROM locations');
  await connection.query('DELETE FROM resources');
  await connection.query('DELETE FROM inventories');
  await connection.query('DELETE FROM survivors');
});

afterEach(async () => {
  await connection.query('DELETE FROM flags');
  await connection.query('DELETE FROM locations');
  await connection.query('DELETE FROM resources');
  await connection.query('DELETE FROM inventories');
  await connection.query('DELETE FROM survivors');
});

afterAll(async () => {
  await server.close();
  await connection.close();
});
