import Router from 'koa-router';
const router = new Router();

// router.all(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true, // 启用GraphiQL
//   }),
// );

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

export default router;

