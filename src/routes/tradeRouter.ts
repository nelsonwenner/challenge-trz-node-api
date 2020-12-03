import TradeController from '../app/controllers/TradeController';
import tradeMiddleware from '../app/middlewares/tradeMiddleware';
import tradeValidator from '../app/validators/tradeValidator';
import router from './configRouter';

export default [
  router.post(
    '/:senderId/trades/:targetId',
    tradeValidator,
    tradeMiddleware,
    TradeController.update
  ),
];
