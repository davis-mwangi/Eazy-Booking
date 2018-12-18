import User from '../controllers/User';
import Auth from '../middleware/Auth';

export default (router) => {
    router.route('/auth/signup')
        .post(User.create);

    router.route('/auth/signin')
        .post(User.login);

    router.route('/auth/del_user')
        .delete(User.delete);    
    
    router.route('/users')
        .get(User.getAll)
    
    router.route('/users/:id')
       .get(Auth.verifyToken, User.getDetails)
       .put(Auth.verifyToken, User.updateUser);    



};
