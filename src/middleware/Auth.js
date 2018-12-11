import jwt from 'jsonwebtoken';
import db from '../db';

const Auth = {
    /**
     * Verify Token
     * @param {object} req,
     * @param {object} res
     * @param {object} next
     * @returns {object|void} response object
     */
    async verifyToken(req, res, next) {
        const authorizationHeader =  req.headers.authorization;
        
        if(authorizationHeader){
            const token =  req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '2d'
            };
    
            try{
               const decoded = await jwt.verify(token, process.env.SECRET_KEY, options);
               const sql ='SELECT * FROM users WHERE id=$1';
               const { rows } = await db.query(sql, [decoded.userId]);
               
               if(!rows[0]) {
                   return res.status(400).send({'message': 'Invalid token provided'});
               }
               req.user = { id: decoded.userId};
               next(); // Use next() to move the next request handler  since its a middleware
            }catch(error){
               return res.status(400).send(error);
            }
            
        } else {
            return res.status(401).send({'message': 'Authentication error. Token required.'});
        }
       
    }
}
export default Auth;