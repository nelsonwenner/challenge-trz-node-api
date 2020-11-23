import {
  getConnectionManager,
  ConnectionManager,
  Connection,
  getConnection,
} from 'typeorm';
import 'dotenv/config';

const connectionManager: ConnectionManager = getConnectionManager();

export const connection = async (): Promise<Connection> =>
  connectionManager.create({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:
      process.env.NODE_ENV === 'test'
        ? process.env.DB_NAME_TEST
        : process.env.DB_NAME,
  });

export const close = async (): Promise<void> => getConnection().close();
