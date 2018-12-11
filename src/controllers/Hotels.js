import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';
import uploadFile from './UploadFile';

const Hotel = {
    /**
     * Create a Hotel
     * @param {object} req
     * @param {object} res
     * @returns {object} hotel object
     */
    async create(req, res) {
        const queryText = `INSERT INTO
        hotels (id, name, description, location, conference_halls, capacity, 
            owner_id, created_date, modified_date)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`;


        const values = [
            uuidv4(),
            req.body.name,
            req.body.description, 
            req.body.location,
            req.body.conference_halls,
            req.body.capacity,
            req.user.id,
            moment(new Date()),
            moment(new Date())
        ];

        try{
            const { rows } = await db.query(queryText, values);
            return res.status(201).send(rows[0]);
        }catch(error){
            return res.status(400).send(error);
        }
    },
    /**
     * Get All Hotels
     * @param {object} req
     * @param {object} res
     * @returns {object} hotels array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM hotels';
        try{
            const { rows, rowCount} = await db.query(findAllQuery);
            return res.status(200).send({rows, rowCount});
        }catch(error){
            return res.status(400).send(error);
        }
    },
    /**
     * Get hotel
     */
    async getOne(req, res) {
        const queryText = "SELECT * FROM hotels WHERE id = $1";
        try{
            const { rows } =  await db.query(queryText, [req.params.id]);
            if(!rows[0]){
                return res.status(404).send({'message': 'Hotel not found'});
            }
            return res.status(400).send(rows[0]);
        }catch(error){
            return res.status(400).send(error);
        }
    },
    /**
     * Update a Hotel
     */
    async update(req, res){
        const findOneQuery = 'SELECT * FROM hotels WHERE id = $1 AND owner_id=$2';
        const updateQuery = `UPDATE hotels
          SET name=$1, description=$2, location=$3,conference_halls=$4,
          capacity=$5,modified_date=$6
          WHERE id = $7 AND owner_id=$8 returning *`;
        
          try{
              const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
              if(!rows[0]){
                  return res.status(404).send({'message': 'Hotel not found'});
              }
              const values = [
                req.body.name || rows[0].name,
                req.body.description || rows[0].description, 
                req.body.location || rows[0].location,
                req.body.conference_halls || rows[0].conference_halls,
                req.body.capacity || rows[0].capacity,
                moment(new Date()),
                req.params.id,
                req.user.id
              ];
              const response =  await db.query(updateQuery, values);
              return res.status(200).send(response.rows[0]);
          } catch( err){
              return res.status(400).send(err);
          }
          
    },
    /**
     * Delete a hotel
     */
    async delete(req, res){
        const deleteQuery = 'DELETE FROM hotels  WHERE id=$1 AND owner_id=$2';
        try{
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if(!rows){
                return res.status(404).send({'message': 'Hotel not found'});
            }
            return res.status(204).send({'message': 'Hotel Deleted'})
        }catch(error){
            return res.status(400).send(error);
        }
        
    },
    
}
export default Hotel;
