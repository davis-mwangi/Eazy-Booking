import { Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

 const pool =  new Pool({
     connectionString : process.env.DATABASE_URL
 });

 export default {
     /**
      * Query DB
      */

    query(queryText, params) {
        return new Promise((resolve, reject) => {
            pool.query(queryText,params)
              .then((res) => {
                  resolve(res);
              })
              .catch((err) => {
                  reject(err);
              });

        });
    }
 }