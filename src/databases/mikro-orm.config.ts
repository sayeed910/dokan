import { Options } from '@mikro-orm/core';
import { join, dirname } from 'path';
import * as config from '../config';

export default {
  debug: true,
  entities: [join(dirname(__dirname), 'apps', '**', '*.entity.ts')],
  // entitiesTs: [join(__dirname, 'src', 'apps', '**', 'models.ts')],
  dbName: config.DB_DATABASE,
  type: 'postgresql',
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  pool: { max: 7, min: 1 },
  synchronize: true,
  migrations: {
    path: join(__dirname, 'src', 'databases', 'migrations'),
    disableForeignKeys: false,
  },
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
  },
} as Options;
