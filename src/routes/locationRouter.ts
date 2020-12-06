import LocationController from '../app/controllers/LocationController';
import locationValidator from '../app/validators/locationValidator';
import router from './configRouter';

export default [
  router.put(
    '/survivors/:survivorId/locations',
    locationValidator,
    LocationController.update
  ),
];
