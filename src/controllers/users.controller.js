const UserService = require("../services/user.service")

const getAllUsers = async (request, response, next) =>{
    try {
        let users = await UserService.getAll();
        return response.json(users)
    } catch (error) {
        next(error)
    }
}

const getUserById = async (request, response, next) => {
    try {
        const { id } = request.params;
        const user = await UserService.getUserById(id)
        return response.json(user)
    } catch (error) {
        next(error)
    }
}

const createUser = async (request, response, next) => {
    try {
        const { firstname, lastname, email, password, profile_image, phone } = request.body;
        const newUser = { firstname, lastname, email, password, profile_image, phone }
        const user = await UserService.create(newUser)
        return response.json(user)
    } catch (error) {
        next(error)
    }
}

const updateUser = async (request, response, next) => {
    const { id } = request.params;
    try {
        const { firstname, lastname, email, password, profile_image, phone } = request.body;
        const updateUser = { firstname, lastname, email, password, profile_image, phone }
        const user = await UserService.update(updateUser, id)
        if (user && user[0]){
            return response.json({message: "Se ha actualizado el registro en el sistema"})
        }
        return response.json({message: "No se ha podido actualizar el registro en el sistema"})

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (request, response, next) => {
    try {
        const { id } = request.params;
        const deleted  = await UserService.delete(id)
        if (deleted){
            return response.json({message: "Se ha eliminado el registro en el sistema"})
        }
        return response.json({message: "No se ha podido eliminar el registro en el sistema"})

    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}