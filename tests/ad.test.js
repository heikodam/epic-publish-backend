const request = require('supertest');
const app = require('../webAPIGateway/app');
const User = require('../microservices/identityHandler/userModel');
const {userOneId, userOne, userTwo, adThree, setupDB, clearDB} = require('./fixtures/addb');

// beforeAll(clearDB)
beforeEach(setupDB);
// afterAll(clearDB)


test("Should get all ads for UserOne", async () => {
    const response = await request(app)
    .get('/ads')
    .set('Cookie', [`token=${userOne.token}`])
    .send()
    .expect(200)

    // Check if it only got the one for the right user, there are 2 ads saved in the db
    expect(response.body.length).toEqual(2)
});


test("Should create ad for UserTwo", async () => {
    await request(app)
    .post('/create-ad')
    .set('Cookie', [`token=${userTwo.token}`])
    .send(adThree)
    .expect(201)


    // Check if ad was added
    const response = await request(app)
    .get('/ads')
    .set('Cookie', [`token=${userTwo.token}`])
    .send()
    .expect(200)

    // Check if it only got the one for the right user, there are 2 ads saved in the db
    expect(response.body.length).toEqual(1)


});