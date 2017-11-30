import itemsRouter from './items.js';

export default app => {
  app.use('/v1/items', itemsRouter);
}
