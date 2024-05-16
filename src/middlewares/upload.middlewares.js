import multer from 'multer';

const diskStorage = (destination) =>
    multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname);
        },
    });

export const uploadProfileImage = multer({ storage: diskStorage('./public/profiles') });
export const uploadModel = multer({ storage: diskStorage('./public/models') });
