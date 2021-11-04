const conversationService = require("../../src/services/conversation.service");
const faker = require("faker");
const getDataValues = require("../../src/utils/sequelize");

describe('Probando el servicio de Conversations', () => {

    let conversationCreated = {}

    // afterAll(async () => {
    //     try {
    //         await conversationService.delete(conversationId)
    //     } catch (error) {
    //         throw error
    //     }
    // })

    it('Debería regresar un arreglo al llamar al método getAll', async () => {
        //AAA
        //Arrange
        //Act
        const results = await conversationService.getAll();
        //Assert
        expect(results).toEqual(expect.any(Array))
    });
    it('Debería regresar un objeta al llamar al método getConversationById', async () => {
        //AAA
        //Arrange
        const id = 1
        //Act
        const result = await conversationService.getConversationById(id)
        //Assert
        expect(result).toEqual(expect.any(Object))
    });
    it('Debería regresar un objeto con los datos de la conversación que se insertó a la DB', async () => {
        //AAA
        //Arrange
        const conversation = {
            title: faker.name.title(),
            image_url: faker.image.imageUrl(),
            created_by: 1
        }
        //Act
        conversationCreated = await conversationService.create(conversation)
        //Assert
        expect(conversationCreated).toEqual(expect.any(Object));
        expect(conversationCreated).toHaveProperty("id");
        expect(conversationCreated).toHaveProperty("created_by",1);
        expect(conversationCreated).toHaveProperty("title",conversation.title);
    });
    it('Debería de regresar true al actualizar la conversación de forma satisfactoria', async () => {
        //AAA
        //Arrange
        conversationCreated = getDataValues(conversationCreated)
        conversationCreated.title = "Probando";
        //Act
        const result = await conversationService.update(conversationCreated, conversationCreated.id)
        //Assert
        expect(result).toBeTruthy();
    });
    it('Debería de regresar true al eliminar la conversación de forma satisfactoria', async () => {
        //AAA
        //Arrange
        //Act
        const result = await conversationService.delete(conversationCreated.id)
        //Assert
        expect(result).toBeTruthy();
    });

})
