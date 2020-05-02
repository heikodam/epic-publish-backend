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

test("Should delete specific Marketplace", async () => {
    await request(app)
    .delete('/marketplaces/me/' + marketplaceOneId.toString())
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if ad was deleted
    const marketplace = await Marketplace.findById(marketplaceOneId);
    expect(marketplace).toBeFalsy()

})

test("Should Delete ALL Marketplaces of a User", async () => {
    await request(app)
    .delete('/marketplaces/me')
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if ads were deleted
    const marketplace = await Marketplace.find({userId: userOneId});
    expect(marketplace).toHaveLength(0)
})

test("Should get data of specific Marketplace", async () => {
    const response = await request(app)
    .get("/marketplaces/me/" + marketplaceOneId.toString())
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if response correct
    expect(response.body).toMatchObject({
        _id: marketplaceOneId.toString(),
        userId: userOneId.toString(),
        marketplace: "immowelt",
        username: "wido@gmx.com",
    })
})



test("Should Patch a Marketplace", async () => {
    await request(app)
        .patch('/marketplace/me/' + marketplaceOneId.toString())
        .set('Cookie', [`token=${userOneToken}`])
        .send({
            username: "odiw@gmail.com",
        })
        .expect(200)
    
    // See if Ad was updated
    const marketplace = await Ad.findById(adOneId.toString())
    expect(marketplace.username).toBe("odiw@gmail.com")
})