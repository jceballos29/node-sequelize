const { Router } = require("express");
const userControllers = require("../controllers/users.controller")
const router = Router();


//Obtener todos los registros
router.get("/users", userControllers.getAllUsers);

//Obtener un registro por id
router.get("/users/:id", userControllers.getUserById);

// Agregar un registro
router.post("/users", userControllers.createUser);

//Actualizar un registro
router.put("/users/:id", userControllers.updateUser);

//Borrar un registro
router.delete("/users/:id", userControllers.deleteUser);


module.exports = router;