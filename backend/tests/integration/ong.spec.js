const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', ()=>{
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async()=>{
        await connection.destroy()
    })

    it('should be able to create a bew ONG', async()=>{
        const response = await request(app).post('/ongs').send({
            name:"ADPEA2",
            email:"emai@email.com",
            whatsapp: "61900000000",
            city: "taguatinga",
            uf: "DF"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);


    });
})