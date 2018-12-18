import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import Helper from './Helper';

const User = {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      users(id, name, phone_no, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.phone_no,
      req.body.email,
      hashPassword,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ token });
    
    } catch(error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' })
      }
      return res.status(400).send(error);
    }
  },
  /**
   * Login
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Some values are missing'});
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({'message': 'The credentials you provided is incorrect'});
      }
      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ token });
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get all Users
   * 
   */
  async getAll(req, res) {
      const queryAll = 'SELECT * FROM users';
      try{
        const {rows, rowCount} = await db.query(queryAll);
        if(!rows){
            return res.status(404).send({'message': 'No user found'});
        }
        return res.status(200).send({rows, rowCount});

      }catch(err) {
          return res.status(400).send(err);
      }

  },


    /**
     * get user details
     */
    async getDetails(req, res) {
      const queryText = "SELECT * FROM users WHERE id = $1";
      try{
          const { rows } =  await db.query(queryText, [req.params.id]);
          if(!rows[0]){
              return res.status(404).send({'message': 'User details not found'});
          }
          return res.status(400).send(rows[0]);
      }catch(error){
          return res.status(400).send(error);
      }

    },
    /**
     * Update a User
     */
    async updateUser(req, res){
      const findOneQuery = 'SELECT * FROM users WHERE id =$1';
      const updateQuery = `UPDATE users
        SET name=$1, phone_no=$2, email=$3, password=$4, modified_date=$5
        WHERE id = $6 returning *`;
      
        try{
            const { rows } = await db.query(findOneQuery, [req.params.id]);
            if(!rows[0]){
                return res.status(404).send({'message': 'User not found'});
            }
            const values = [
              req.body.name || rows[0].name,
              req.body.phone_no || rows[0].phone_no, 
              req.body.email || rows[0].email,
              req.body.password || rows[0].password,
              moment(new Date()),
              req.params.id,
            ];
            const response =  await db.query(updateQuery, values);
            return res.status(200).send(response.rows[0]);
        } catch( err){
            return res.status(400).send(err);
        }
        
  },

}


export default User;