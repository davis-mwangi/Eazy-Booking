import multer from 'multer';

//MULTER CONFIG:  to get file photos to temp server storage

const multerConfig = {
    storage: multer.diskStorage({

        //Setup where the  user's file will go
        destination: function(req, file, next){
            next(null, './public/photo-storage');
        },

        //Then give file a unique name
        filename: function(req, file, next) {
            console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null. file.fieldname + '_' + Date.now() + '.'+ext);
        }
    }),
    // Ensuring only imagesa re uploaded
    fileFilter: function(req, file, next) {
        if(!file){
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if(image) {
            console.log('photo uploaed');
            next(null, true);
        } else {
            console.log("file not supported");

            return next();
        }
    }
};
export default multerConfig;