const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../microservices/identityHandler/userModel");
const Ad = require("../../microservices/ads/adModel");

const userOneId = new mongoose.Types.ObjectId()
const userOneToken = jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET, {expiresIn: '12h'})
const userOne = {
    _id: userOneId,
    firstname: 'Gunther',
    surname: 'Horn',
    email: 'gunther@z.com',
    password: '1234567',
    date: new Date(),
}


const userTwoId = new mongoose.Types.ObjectId()
const userTwoToken = jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_SECRET, {expiresIn: '12h'})
const userTwo = {
    _id: userTwoId,
    firstname: 'Dagobert',
    surname: 'Kuhn',
    email: 'dagobert@b.com',
    password: '1234567',
    date: new Date(),
}

// Ad for User One
const adOneId = new mongoose.Types.ObjectId()
const adOne = {
    _id: adOneId,
    category: "real-estate",
    size: 26,
    rooms: 2,
    bathrooms: 1,
    bedrooms: 1,
    rent: 440,
    deposit: 880,
    title: "Amazing Penthouse in the Middle of nowhere",
    description: "You will never get lost in this area, because you'll never know where you are anyways. If you rent it right now you'll get some FREE Toilet Paper",
    name: "Siebert",
    marketplaces: ["ebaykleinanzeige", "immowelt"],
    userId: userOneId,
    date: new Date()
}

// Ad for User Two
const adTwoId = new mongoose.Types.ObjectId()
const adTwo = {
    _id: adTwoId,
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
    date: new Date(),
    userId: userOneId
}

const adThreeId = new mongoose.Types.ObjectId()
const adThree = {
    _id: adThreeId,
    category: "real-estate",
    size: 120,
    rooms: 4,
    bathrooms: 10,
    bedrooms: 20,
    rent: 1821,
    deposit: 3000,
    title: "Beautiful containers to rent bear the highway",
    description: "If you rent this place you do not get only 1 Container, you don't get 2 Containers or 3 Contianers but a total of 6 Containers all yours if you decide to rent this place. Another cool side benefit is that these containers are right next to the Highe way so you'll always have perfect access to quick transportation.",
    name: "Siebert",
    phoneNumber: "017628714838",
    imgLinks: ["https://res.cloudinary.com/heikodam/image/upload/v1588335255/sample.jpg"],
    date: new Date(),
    userId: userTwoId
}


const setupDB = async () => {
    await User.deleteMany()
    await Ad.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Ad(adOne).save()
    await new Ad(adTwo).save()
}

const clearDB = async () => {
    await User.deleteMany()
    await Ad.deleteMany()
}

module.exports = {
    userOneId,
    userOne,
    userOneToken,
    userTwoId,
    userTwo,
    userTwoToken,
    adOneId,
    adOne,
    adTwoId,
    adTwo,
    adThreeId,
    adThree,
    setupDB,
    clearDB
}