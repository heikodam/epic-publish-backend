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

### Users
#### POST /users/:
- **Action**: Create a new user in the Database.

**Returns**: 
- Failure Status: 400
- Success Status: 201
- Data: {firstname, surname, email, date}
<br />

#### POST /users/login/:
- **Action**: Login User by sending email and password

- **Returns**: 
    - Failure Status: 401
    - Success Status: 200
    - Data: {user: {firstname, surname, email, date}, token}
<br />

#### Post /users/logout/:
- **Action**: Logs the current user out.
    - Cookies are cleared
    - Token gets Blacklisted
    - Expired Tokens on Blacklist are removed

- **Returns**: 
    - Failure Status: 400
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />

#### GET /users/me/:
- **Action**: Get the current users profile data.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />

#### DELETE /users/me/:
- **Action**: Delete the current logged in User

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: 
<br />

#### PATCH /users/me/:
- **Action**: Update the current User Profile data.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />


### Ads
#### POST /ads/:
- **Action**: Create a new ad.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 201
    - Data: Full Newly Created Ad
<br />

#### GET /ads/me/:
- **Action**: Get all ads of current user.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: List of all ads of the user
<br />

#### GET /ads/me/:adId :
- **Action**: Get the data of one specific ad.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: Full Data of Ad 
<br />

#### DELETE /ads/me :
- **Action**: Delete all ads for current user.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: 
<br />

#### DELETE /ads/me/:adId
- **Action**: Delete a specific ad.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: 
<br />

#### PATCH /ads/me/:adId
- **Action**: Update specific Ad.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 201
    - Data: Full Newly Updated Ad
<br />

### Marketplaces

## Deployment

# Worth Mentioning

## Chaching

# Testing

To Remove the logging from cote go to node_modules\cote\src\components\discovery.js and in default Options change log to false