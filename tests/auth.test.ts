import request from 'supertest';
import Main from '../src/main';
import { DI } from '../src/databases';
import { CreateUserDto } from '../src/apps/user/users.dto';
import AuthRoute from '../src/api/routes/auth.route';

const authRoute = new AuthRoute();

const app = new Main([authRoute]);

let cookies: string;

/**
 ** MikroORM Seeding
 ** https://mikro-orm.io/docs/seeding#use-in-tests
 */

beforeAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));

  await DI.orm.getSchemaGenerator().refreshDatabase();
});

afterAll(async () => {
  await DI.orm.close();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });
  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      const res = await request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);

      cookies = res.headers['set-cookie'];
    });
  });
  describe('[POST] /logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };
      return request(app.getServer())
        .post(`${authRoute.path}logout`)
        .send(userData)
        .set('Cookie', cookies)
        .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
    });
  });
});
