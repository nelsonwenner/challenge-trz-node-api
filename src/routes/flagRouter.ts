import FlagController from '../app/controllers/FlagController';
import flagValidator from '../app/validators/flagValidator';
import router from './configRouter';

export default [router.post('/flags', flagValidator, FlagController.create)];
