const request = require('supertest');
const app = require('../webAPIGateway/app');
const User = require('../microservices/identityHandler/userModel');
const {userOneId, userOne, setupDB, clearDB} = require('./fixtures/db');

// beforeAll(clearDB)
beforeEach(setupDB);

test('users', async () => {

    // Creat the user and get the response
    const response = await request(app)
    .post('/users')
    .send({
        firstname: 'Uwe',
        surname: "Stein",
        email: 'uwe@b.com',
        password: '1234567',
        date: new Date()
    })
    .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    // Assert that the response is correct
    expect(response.body).toMatchObject({
        user: {
            firstname: 'Uwe',
            surname: 'Stein',
            email: 'uwe@b.com'
        }
    })

    // See if token was send along
    expect(response.body.token).toBeTruthy()
});

// test('Should Fail to Create user with existing email', async () => {
//     const response = await request(app)
//     .post('/createUser')
//     .send({
//         name: userOne.name,
//         email: userOne.email,
//         password: "lekker"
//     }).expect(400)
// })


// test('Should login existing user', async () => {

//     // Check if able to login
//     const response = await request(app).post('/login').send({
//         email: userOne.email,
//         password: userOne.password
//     }).expect(200)

//     // Check if token response is correct
//     const user = await User.findById(userOneId)
//     expect(response.body.token).toBe(user.token)
// })


// test('Should not login user with wrong Password', async () => {
//     await request(app).post('/login').send({
//         email: userOne.email,
//         password: 'thisisnotmypass'
//     }).expect(400)
// })