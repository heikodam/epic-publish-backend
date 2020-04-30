const request = require('supertest');
const app = require('../webAPIGateway/app');
const Ad = require('../microservices/ads/adModel');
const {userOneId, userOne, userTwo, adOneId, adThree, setupDB, clearDB} = require('./fixtures/addb');

beforeEach(setupDB);


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

test("Should delete Ad", async () => {
    await request(app)
    .post('/delete-ad')
    .set('Cookie', [`token=${userOne.token}`])
    .send({adId: adOneId})
    .expect(200)

    // Check if ad was deleted
    const ad = await Ad.findById(adOneId);
    expect(ad).toHaveLength(0)

})