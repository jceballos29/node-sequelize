const userService = require("../../src/services/user.service");
const faker = require("faker");
const getDataValues = require("../../src/utils/sequelize");

describe("Probando el servicio de User", () => {
    let userId = 0;
    let userCreated = {};
    let newUser = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
        phone: faker.phone.phoneNumber("(###)###-##-##"),
    };

    beforeAll(async () => {
        userCreated = await userService.create(newUser);
        userCreated = getDataValues(userCreated);
    });

    afterAll(async () => {
        try {
            await userService.delete(userId);
        } catch (error) {
            throw error;
        }
    });

    it("Debería obtener un arreglo al llamar al método getAll", async () => {
        //AAA
        //Arrange
        //Act
        const results = await userService.getAll();
        //Assert
        expect(results).toEqual(expect.any(Array));
    });

    it("Debería obtener un objeto al llamar al método getUserById", async () => {
        //AAA
        //Arrange
        const id = 1;
        //Act
        const result = await userService.getUserById(id);
        //Assert
        expect(result).toEqual(expect.any(Object));
    });

    it("Debería obtener un objeto con los datos del usuario que acabamos de instar en la DB", async () => {
        //AAA
        //Arrange
        const user = {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(8),
            phone: faker.phone.phoneNumber("(###)###-##-##")
        };
        //Act
        const result = await userService.create(user);
        userId = result.id;
        //Assert
        expect(result).toEqual(expect.any(Object));
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("firstname", user.firstname);
    });

    it("Debería de regresa true al actualizar el usuario de forma satisfactoria", async () => {
        //AAA
        //Arrange
        userCreated.firstname = "Hector";
        //Act
        const result = await userService.update(userCreated, userCreated.id);
        //Assert
        expect(result).toBeTruthy();
    });
    it("Debería de regresa true al eliminar el usuario de forma satisfactoria", async () => {
        //AAA
        //Arrange
        //Act
        const result = await userService.delete(userCreated.id);
        //Assert
        expect(result).toBeTruthy();
    });
});
