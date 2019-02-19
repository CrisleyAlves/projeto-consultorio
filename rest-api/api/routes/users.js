const express = require("express");
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/user");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/users/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) =>{        
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }    
}

const upload = multer({ 
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});

router.post('/', upload.single('photo'), userController.insert);
router.get("/", userController.getAll);
router.get("/:userId", userController.getById);
router.post("/login", userController.login);
router.delete("/:userId", userController.delete);

router.post('/uploadFile', upload.single('photo'), userController.uploadFile);

module.exports = router;