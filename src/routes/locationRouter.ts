import LocationController from '../app/controllers/LocationController';
import locationValidator from '../app/validators/locationValidator';
import router from './configRouter';

export default [
  router.put('/locations', locationValidator, LocationController.update),
];
