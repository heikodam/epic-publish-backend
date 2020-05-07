const request = require('supertest');
const app = require('../webAPIGateway/app');
const User = require('../microservices/users/userModel');
const {userOneId, userOne, setupDB, userOneToken} = require('./fixtures/db');

// beforeAll(clearDB)
beforeEach(setupDB);

test('Should Create a User', async () => {

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
    const user = await User.findOne({firstname: 'Uwe', surname: "Stein"})
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

test('Should Fail to Create user with existing email', async () => {
    const response = await request(app)
    .post('/users')
    .send({
        firstname: userOne.firstname,
        surname: userOne.surname,
        email: userOne.email,
        password: "lekker"
    }).expect(400)
})


test('Should login existing user', async () => {

    // Check if able to login
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    // Check if token was send a long
    const user = await User.findById(userOneId.toString())

    // Check if response data is correct
    expect(response.body.user).toMatchObject({
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
    })

    // Check if token was send along
    expect(response.body.token).toBeTruthy()
})


test('Should not login user with wrong Password', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

test('Should delete user', async () => {
    const response = await request(app)
        .delete('/users/me')
        .set('Cookie', [`token=${userOneToken}`])
        .send().expect(200)

    // Check if user deleted
    const user = await User.findById(userOneId.toString())
    expect(user).toBeNull()
})

test('Should update user Profile', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Cookie', [`token=${userOneToken}`])
        .send({
            firstname: "Alfred"
        })
        .expect(200)
    
    // See if Firstname was updated
    const user = await User.findById(userOneId.toString())
    expect(user.firstname).toBe("Alfred")
})

test('Should fail to update Profile with wrong data', async () => {
    await request(app)
        .patch('/users/me')
        .set('Cookie', [`token=${userOneToken}`])
        .send({
            name: "Alfred"
        })
        .expect(400)
})


test('Should get the users profile', async () => {
    const response = await request(app)
        .get('/users/me')
        .set('Cookie', [`token=${userOneToken}`])
        .send()
        .expect(200)

    expect(response.body).toMatchObject(
        {
            firstname: 'Gunther',
            surname: 'Horn',
            email: 'gunther@z.com',
        })
})

// Code works but since token is then on blacklist not able to auth afterwards
// test('Should log user out', async () => {
//     const response = await request(app).post('/users/logout')
//     .set('Cookie', [`token=${userOneToken}`])
//     .send()
//     .expect(200)

//     // No cookies allowed
//     expect(response.cookie).toBeFalsy()

//     // Check if token is invalid
//     await request(app)
//     .get('/ads')
//     .set('Cookie', [`token=${userOneToken}`])
//     .send()
//     .expect(401)
// })