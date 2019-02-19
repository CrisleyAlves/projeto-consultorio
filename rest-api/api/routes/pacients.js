const express = require("express");
const router = express.Router();
const multer = require("multer");
const pacientController = require("../controllers/pacient");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/pacients/')
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


router.get("/", pacientController.getAll);
router.get("/:pacientId", pacientController.getById);
router.post('/', upload.single('photo'), pacientController.insert);
router.post('/login', pacientController.login);
router.delete("/:pacientId", pacientController.delete);
router.patch("/", pacientController.patch);

router.post('/uploadFile', upload.single('photo'), pacientController.uploadFile);

router.get("/filter/cpf/:cpf", pacientController.getByCpf);

module.exports = router;
