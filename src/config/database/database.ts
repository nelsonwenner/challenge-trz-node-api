import {
  Connection,
  getConnection,
  createConnection,
  ConnectionOptions,
} from 'typeorm';
import ormconfig from './ormconfig';

export const connect = async (name = 'default'): Promise<Connection> =>
  createConnection(Object.assign(ormconfig as ConnectionOptions, { name }));

export const close = async (): Promise<void> => {
  const connection: Connection = getConnection();
  connection.close();
};
