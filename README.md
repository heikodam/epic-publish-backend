# My Project: Epic Publish:
Go on the Website fill out a form to post an Ad to rent our your Apartment. The Web App should then post it on the different marketplaces (eg. ebay-kleinanzeige, immobilienscout24, immowelt...).

## How far did I get?
One is able to create/edit/delete an account, ads and Marketplaces. But the functionality of publishing the ads on the marketplaces I have not started yet. 

The Project is Live here: [Epic Publish](https://fierce-tundra-77613.herokuapp.com/)
You can either signup and add your own data or use this account where data is already populated:

Email: a@b.com
Password: 1234567


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

All elements marked with a * are required.

### Users:
```node
{
    *_id,
    *firstname,
    *surname,
    *email,
    *password,
    *date
}
```
### Ads:

The challenge that comes up here is that the  different marketplaces all have different structures for their ads. This structure changes over time. So the data structure in the DB will also change over time and needs to be highly flexible. Still there are some elements that will most likly not change over time, and these are required to give some structure to the data, and to be able to search the data.

```node
{
    *_id,
    *userId,
    *date,
    *title,
    *description,
    *rent,
    marketplaces,
    imgLinks,
    anything else...
}
```

### Marketplaces:

In this resource the password element can not be hashed, since the clear text is needed when logging into a marketplace (This is a security threat). To compensated a little for this, the passwords are encrypted. 

```node
{
    *_id,
    *userId,
    *date,
    *marketplace,
    *username,
    *password
}
```



## Routes

Format:

#### POST /users/:
**Action**:
- Create a new user in the Database.
**Returns**: 
- Failure Status: 400
- Success Status: 201
- Data: Full User Profile
         

### Users




### Ads
### Marketplaces

## Deployment


# Testing

To Remove the logging from cote go to node_modules\cote\src\components\discovery.js and in default Options change log to false