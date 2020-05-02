const request = require('supertest');
const app = require('../webAPIGateway/app');
const Marketplace = require('../microservices/marketplaces/marketplaceModel');
const {userOneId, userOne, userOneToken, userTwo, userTwoToken, adOneId, adTwoId, adThree, adThreeId, setupDB, marketplaceOneId, marketplaceOne, marketplaceTwoId, marketplaceTwo,} = require('./fixtures/db');

beforeEach(setupDB);

test("Should create Marketplace for UserOne", async () => {
    // const adDataToSave = {"formValues": JSON.stringify(adThree)}
    
    await request(app)
    .post('/marketplaces')
    .set('Cookie', [`token=${userOneToken}`])
    .send(marketplaceTwo)
    .expect(201)

    // Check if marketplace was added
    const marketplace = await Marketplace.findById(marketplaceTwoId.toString())
    expect(marketplace).toBeTruthy()
});


test("Should get all the Marketplaces for UserOne", async () => {
    const response = await request(app)
    .get('/marketplaces/me')
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if it only got the one for the right user, there are 2 ads saved in the db
    expect(response.body.length).toEqual(1)

    // Check if correct content was fetched for each ad
    expect(response.body[0]).toMatchObject({
        userId: userOneId.toString(),
        marketplace: "immowelt",
        username: "wido@gmx.com",
    })
});

// test("Should delete Ad", async () => {
//     await request(app)
//     .delete('/ads/me/' + adOneId.toString())
//     .set('Cookie', [`token=${userOneToken}`])
//     .send()
//     .expect(200)

//     // Check if ad was deleted
//     const ad = await Ad.findById(adOneId);
//     expect(ad).toBeFalsy()

// })

// test("Should get data of specific ad", async () => {
//     const response = await request(app)
//     .get("/ads/me/" + adTwoId.toString())
//     .set('Cookie', [`token=${userOneToken}`])
//     .send()
//     .expect(200)

//     // Check if response correct
//     expect(response.body).toMatchObject({
//         _id: adTwoId.toString(),
//         title: "Amazing House with 10 exclusive Bathrooms",
//         description: "This amazing House is a bargin. Where you ever to far away from a bathroom that you where not able to make it. Well in this Apartment with 10 Bathrooms, you always will be near one. You'll never ever be late again. You actually do not have a option to be far away, because this apartment only has bathrooms... enjoy this one in a lifetime oppurtunity",
//         rent: 730,
//     })
// })

// test("Should Delete ALL Ads of a User", async () => {
//     await request(app)
//     .delete('/ads/me')
//     .set('Cookie', [`token=${userOneToken}`])
//     .send()
//     .expect(200)

//     // Check if ads were deleted
//     const ad = await Ad.find({userId: userOneId});
//     expect(ad).toHaveLength(0)
// })

// test("Should Patch a Ad", async () => {
//     const response = await request(app)
//         .patch('/ads/me/' + adOneId.toString())
//         .set('Cookie', [`token=${userOneToken}`])
//         .send({
//             title: "Biggest and most expensive house in the World for Free",
//         })
//         .expect(200)
    
//     // See if Ad was updated
//     const ad = await Ad.findById(adOneId.toString())
//     expect(ad.title).toBe("Biggest and most expensive house in the World for Free")
// })