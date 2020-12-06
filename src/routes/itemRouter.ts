import ItemController from '../app/controllers/ItemController';
import router from './configRouter';

export default [router.get('/items', ItemController.index)];
