import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import routes from './routes';

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /dist/app/img will be /img for users
app.use(express.static(`${__dirname}/../app`));

// routes
routes(app);

export default app;
