const request = require('supertest');
const FormData = require('form-data');
const path = require('path');
const fs = require('fs');
const app = require('../webAPIGateway/app');
const Ad = require('../microservices/ads/adModel');
const {userOneId, userOne, userOneToken, userTwo, userTwoToken, adOneId, adTwo, adTwoId, adThree, adThreeId, setupDB, clearDB} = require('./fixtures/db');

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

test("Should create ad for UserTwo", async () => {
    await request(app)
    .post('/ads')
    .set('Cookie', [`token=${userTwoToken}`])
    .field("photos", fs.createReadStream(path.join(__dirname, '/resources/house.jpg')))
    .field("formValues", JSON.stringify(adThree))
    .expect(201)

    const ad = await Ad.findById(adThreeId.toString())
    expect(ad).toBeTruthy()
    expect(ad.imgs.length).toEqual(1)
});

test("Should delete Ad", async () => {
    await request(app)
    .delete('/ads/me/' + adOneId.toString())
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if ad was deleted
    const ad = await Ad.findById(adOneId);
    expect(ad).toBeFalsy()

})

test("Should get data of specific ad", async () => {
    const response = await request(app)
    .get("/ads/me/" + adTwoId.toString())
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if response correct
    expect(response.body).toMatchObject({
        category: "real-estate",
        size: 36,
        rooms: 0,
        bathrooms: 10,
        bedrooms: 0,
        rent: 730,
        deposit: 1000,
        title: "Amazing House with 10 exclusive Bathrooms",
        description: "This amazing House is a bargin. Where you ever to far away from a bathroom that you where not able to make it. Well in this Apartment with 10 Bathrooms, you always will be near one. You'll never ever be late again. You actually do not have a option to be far away, because this apartment only has bathrooms... enjoy this one in a lifetime oppurtunity",
        name: "Siebert",
        phoneNumber: "017628714838",
        marketplaces: ["ebaykleinanzeige"],
    })
})

test("Should Delete ALL Ads of a User", async () => {
    await request(app)
    .delete('/ads/me')
    .set('Cookie', [`token=${userOneToken}`])
    .send()
    .expect(200)

    // Check if ads were deleted
    const ad = await Ad.find({userId: userOneId});
    expect(ad).toHaveLength(0)
})

test("Should Patch a Ad", async () => {
    const response = await request(app)
        .patch('/ads/me/' + adOneId.toString())
        .set('Cookie', [`token=${userOneToken}`])
        .send({
            title: "Biggest and most expensive house in the World for Free",
        })
        .expect(200)
    
    // See if Ad was updated
    const ad = await Ad.findById(adOneId.toString())
    expect(ad.title).toBe("Biggest and most expensive house in the World for Free")
})