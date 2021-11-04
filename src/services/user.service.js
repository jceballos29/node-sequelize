
const {users} = require("../models")

class UserService {
    static async getAll() {
        try {
            let results = await users.findAll();
            return results
        } catch (error) {
            throw error
        }
    }

    static async getUserById(id) {
        try {
            let result = await users.findByPk(id);
            if(result) {
                return result
            }
            return {}
        } catch (error) {
            throw error;
        }
    }

    static async create(newUser) {
        try {
            let result = await users.create(newUser)
            return result;
        } catch (error) {
            throw error
        }
    }

    static async update(updateUser, id) {
        try {
            let result = await users.update(updateUser, {
                where: {
                    id
                }
            })
            if (result[0] === 0){
                return false;
            }
            return true;
        } catch (error) {
            throw error
        }
    }

    static async delete(id){
        try {
            let result = await users.destroy({
                where:{
                    id
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }

}

module.exports = UserService;

