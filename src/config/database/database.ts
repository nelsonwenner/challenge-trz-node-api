import {
  getConnectionManager,
  ConnectionManager,
  Connection,
  getConnection,
  ConnectionOptions,
} from 'typeorm';
import ormconfig from './ormconfig';

const connectionManager: ConnectionManager = getConnectionManager();

export const connect = async (): Promise<Connection> =>
  connectionManager.create(ormconfig as ConnectionOptions);

export const close = async (): Promise<void> => {
  const connection: Connection = getConnection();
  connection.close();
};
