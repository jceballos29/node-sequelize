const ConversationService = require("../services/conversation.service")

const getAllConversations = async (request, response, next) =>{
    try {
        let conversations = await ConversationService.getAll();
        return response.json(conversations)
    } catch (error) {
        next(error)
    }
}

const getConversationsById = async (request, response, next) => {
    try {
        const { id } = request.params;
        const user = await ConversationService.getConversationById(id)
        return response.json(user)
    } catch (error) {
        next(error)
    }
}

const createConversations = async (request, response, next) => {
    try {
        const { title, image_url, type, created_by } = request.body;
        const newConversation = { title, image_url, type, created_by }
        const conversation = await ConversationService.create(newConversation)
        return response.json(conversation)
    } catch (error) {
        next(error)
    }
}

const updateConversations = async (request, response, next) => {
    const { id } = request.params;
    try {
        const { title, image_url, type, created_by } = request.body;
        const updateConversation = { title, image_url, type, created_by }
        const conversation = await ConversationService.update(updateConversation, id)
        if (conversation && conversation[0]){
            return response.json({message: "Se ha actualizado el registro en el sistema"})
        }
        return response.json({message: "No se ha podido actualizar el registro en el sistema"})

    } catch (error) {
        next(error)
    }
}

const deleteConversations = async (request, response, next) => {
    try {
        const { id } = request.params;
        const deleted  = await ConversationService.delete(id)
        if (deleted){
            return response.json({message: "Se ha eliminado el registro en el sistema"})
        }
        return response.json({message: "No se ha podido eliminar el registro en el sistema"})

    } catch (error) {
        next(error)
    }

}

const conversationUsers = async (request, response, next) => {
    try {
        const { id } = request.params;
        const conversation = await ConversationService.joinUsers(id);
        return response.json(conversation)
    } catch (error) {
        next(error)
    }
}


const conversationParticipants = async (request, response, next) => {
    try {
        const { id } = request.params;
        const conversation = await ConversationService.joinParticipants(id);
        return response.json(conversation)
    } catch (error) {
        next(error)
    }
}


const conversationMessages = async (request, response, next) => {
    try {
        const { id } = request.params;
        const conversation = await ConversationService.joinMessages(id);
        return response.json(conversation)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll: getAllConversations,
    getById: getConversationsById,
    create: createConversations,
    update: updateConversations,
    delete: deleteConversations,
    users: conversationUsers,
    participants: conversationParticipants,
    messages: conversationMessages
}