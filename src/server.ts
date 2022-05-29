import Main from '@/main';
import AuthRoute from '@/api/routes/auth.route';
import IndexRoute from '@/api/routes/index.route';
import UsersRoute from '@/api/routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new Main([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
