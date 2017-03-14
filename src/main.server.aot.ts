import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
import { universalExpressEngine } from '@angularclass/universal-express';
import { ROUTES } from './routes';
import { App } from './api/app';
import { enableProdMode } from '@angular/core';
enableProdMode();
const app = express();
const api = new App();
const port = 8000;
const baseUrl = `http://localhost:${ port }`;

app.engine('html', universalExpressEngine({
  ngModule: ServerAppModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'dist');

app.use('/', express.static('dist', { index: false }));

ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(8000, () => {
  console.log(`Listening at ${baseUrl}`);
});
