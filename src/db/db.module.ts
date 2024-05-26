import { Global, Module } from '@nestjs/common';
import knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';
import * as dotenv from 'dotenv';
import { Contact } from './models/contact';
dotenv.config({ path: '.env' });

const models = [Contact];
const modelProviders = models.map((model) => ({
  provide: model.name,
  useValue: model,
}));

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const db = knex({
        client: 'pg',
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      Model.knex(db);

      return db;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
