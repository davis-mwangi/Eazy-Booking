import hotels from './hotels';
import user from './users';

export default (router) => {
  user(router);  
  hotels(router);

  return router;
};