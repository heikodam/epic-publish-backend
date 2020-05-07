# My Project:
Go on the Website fill out a form to post an Ad to rent our your Apartment. The Web App should then post it on the different marketplaces (eg. ebay-kleinanzeige, immobilienscout24, immowelt...).

## How far did I get?
One is able to create/edit/delete an account, ads and Marketplaces. But the functionality of publishing the ads on the marketplaces I have not started yet. 


## Architecture & Tech Stack

Post Img here:

Client: React

Backend: 
- Nodejs
- For Micorservices I used [cote](https://www.npmjs.com/package/cote) a zero-configuration microservices

DB:
My NoSQL DB is running on [MongoDB](https://www.mongodb.com/)

Img DB:
Imgs are stored on [Cloudinary](https://cloudinary.com/)

## Resources

### Users:
```node
{
    _id,
    firstname,
    surname,
    email,
    password,
    date
}
```
### Ads:

### Marketplaces:


## Routes



# Testing

To Remove the logging from cote go to node_modules\cote\src\components\discovery.js and in default Options change log to false