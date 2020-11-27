import * as path from 'path';
import 'dotenv/config';

const options = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  entities: [path.resolve(__dirname, '..', '..', 'app', 'models', '*')],
  cli: { migrationsDir: 'src/config/database/migrations' },
  logging: true,
};

export default options;
