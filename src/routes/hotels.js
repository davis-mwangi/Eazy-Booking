import Hotels from '../controllers/Hotels';
import Auth from '../middleware/Auth';

export default(router) => {
   router.route('/hotels')
    .post(Auth.verifyToken,Hotels.create)
    .get(Auth.verifyToken,Hotels.getAll)
   
   router.route('/hotels/:id')
     .get(Auth.verifyToken,Hotels.getOne)
     .put(Auth.verifyToken,Hotels.update)
     .delete(Auth.verifyToken,Hotels.delete) 
        
};

