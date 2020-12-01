import SurvivorController from '../app/controllers/SurvivorController';
import survivorValidator from '../app/validators/survivorValidator';
import router from './configRouter';

export default [
  router.post('/survivors', survivorValidator, SurvivorController.create),
  router.get('/survivors', SurvivorController.index),
];
