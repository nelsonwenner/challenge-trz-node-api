import survivorValidator from '../app/validators/survivorValidator';
import router from './configRouter';

export default [router.post('/survivors', survivorValidator)];
