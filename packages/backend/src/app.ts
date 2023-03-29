import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
// import onerror from 'koa-onerror';
// import views from 'koa-views';
import path from 'path';
const app = new Koa();

import index from './routes/index';

// error handler
// onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(path.join(__dirname, '../../../public')));

// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms: number = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes());
app.use(index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;

