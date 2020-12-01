import TradeController from '../app/controllers/TradeController';
import tradeValidator from '../app/validators/tradeValidator';
import router from './configRouter';

export default [
  router.put(
    '/:senderId/trades/:targetId',
    tradeValidator,
    TradeController.update
  ),
];
