const request = require('supertest');
const app = require('../webAPIGateway/app');
const Ad = require('../microservices/ads/adModel');
const {userOneId, userOne, userOneToken, userTwo, adOneId, adThree, setupDB, clearDB} = require('./fixtures/db');

beforeEach(setupDB);


test("Should get all ads for UserOne", async () => {
    const response = await request(app)
    .get('/ads/me')
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if it only got the one for the right user, there are 2 ads saved in the db
    expect(response.body.length).toEqual(2)

    // Check if correct content was fetched for each ad
    expect(response.body[0]).toMatchObject({
        userId: userOneId.toString(),
        title: "Amazing Penthouse in the Middle of nowhere",
        description: "You will never get lost in this area, because you'll never know where you are anyways. If you rent it right now you'll get some FREE Toilet Paper",
        rent: 440
    })
});


// test("Should create ad for UserTwo", async () => {
//     await request(app)
//     .post('/create-ad')
//     .set('Cookie', [`token=${userTwo.token}`])
//     .send(adThree)
//     .expect(201)


//     const ad = await Ad.findById(adThreeId)
//     expect(ad).toHaveLength(1)

//     // // Check if ad was added
//     // const response = await request(app)
//     // .get('/ads')
//     // .set('Cookie', [`token=${userTwo.token}`])
//     // .send()
//     // .expect(200)

//     // // Check if it only got the one for the right user, there are 2 ads saved in the db
//     // expect(response.body.length).toEqual(1)


// });

// test("Should delete Ad", async () => {
//     await request(app)
//     .delete('/ad/' + adOneId)
//     .set('Cookie', [`token=${userOne.token}`])
//     .send()
//     .expect(200)

//     // Check if ad was deleted
//     const ad = await Ad.findById(adOneId);
//     expect(ad).toHaveLength(0)

// })