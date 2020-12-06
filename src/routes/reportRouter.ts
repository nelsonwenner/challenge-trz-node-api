import ReportController from '../app/controllers/ReportController';
import router from './configRouter';

export default [router.get('/reports', ReportController.index)];
