import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MikroORM } from '@mikro-orm/core';
// import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
// import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE } from '@config';
// import { BaseEntity } from '@/apps/core/base.entity';
import { UserEntity } from '@/apps/user/users.entity';

// export const dbOptions: Options = {
//   type: 'postgresql',
//   clientUrl: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//   entities: [BaseEntity, UserEntity],
//   highlighter: new MongoHighlighter(),
//   debug: NODE_ENV === 'development' ? true : false,
// };

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<UserEntity>;
};
