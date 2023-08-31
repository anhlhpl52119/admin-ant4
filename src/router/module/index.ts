import dashboard from './dashboard';
import user from './user';
import management from './management';
import error from './error';
import demo from './demoError';
import driver from './driver';
import branch from './branch';

export default [...driver, ...branch, ...dashboard, ...user, ...management, ...error, ...demo];
