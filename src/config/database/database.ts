import {
  Connection,
  getConnection,
  createConnection,
  ConnectionOptions,
} from 'typeorm';
import ormconfig from './ormconfig';

export const connect = async (): Promise<Connection> =>
  createConnection(ormconfig as ConnectionOptions);

export const close = async (): Promise<void> => {
  const connection: Connection = getConnection();
  connection.close();
};
