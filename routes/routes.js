const router = require("express").Router();
const user = require("../controllers/users.controllers")
 

//Rutas de inicio
router.post("/inserUser", user.insert);


module.exports = router;

