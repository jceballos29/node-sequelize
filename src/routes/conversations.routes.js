const { Router } = require("express");
const ConversationController = require('../controllers/conversations.controller')
const router = Router();


//Obtener todos los registros
router.get("/conversations", ConversationController.getAll);

//Obtener un registro por id
router.get("/conversations/:id", ConversationController.getById);

// Agregar un registro
router.post("/conversations", ConversationController.create);

//Actualizar un registro
router.put("/conversations/:id", ConversationController.update);

//Borrar un registro
router.delete("/conversations/:id", ConversationController.delete);

//Relaciones con otros modelos
router.get("/conversations/:id/users", ConversationController.users);

router.get("/conversations/:id/participants", ConversationController.participants);

router.get("/conversations/:id/messages", ConversationController.messages);



module.exports = router;