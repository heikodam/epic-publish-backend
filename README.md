# Table of Contents
1. [My Project](#my-project)
2. [How far did I get](#how-far)
3. [Architecture & Tech Stack](#architecture)
4. [Resources](#resources)
5. [Routes](#routes)

...snip... 

<a name="my-project"/>

# My Project: Epic Publish:
Go on the Website fill out a form to post an Ad to rent our your Apartment. The Web App should then post it on the different marketplaces (eg. ebay-kleinanzeige, immobilienscout24, immowelt...).

<a name="how-far"/>

## How far did I get?
One is able to create/edit/delete an account, ads and Marketplaces. But the functionality of publishing the ads on the marketplaces I have not started yet. 

The Project is Live here: [Epic Publish](https://fierce-tundra-77613.herokuapp.com/)
You can either signup and add your own data or use this account where data is already populated:

Email: a@b.com
Password: 1234567


<a name="architecture"/>

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

<a name="resources"/>
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



<a name="routes"/>

## Routes        

### Users:
#### POST /users/
- **Action**: Create a new user in the Database.

**Returns**: 
- Failure Status: 400
- Success Status: 201
- Data: {firstname, surname, email, date}
<br />

#### POST /users/login/
- **Action**: Login User by sending email and password

- **Returns**: 
    - Failure Status: 401
    - Success Status: 200
    - Data: {user: {firstname, surname, email, date}, token}
<br />

#### Post /users/logout/
- **Action**: Logs the current user out.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />

#### GET /users/me/
- **Action**: Get the current users profile data.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />

#### DELETE /users/me/
- **Action**: Delete the current logged in User

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: 
<br />

#### PATCH /users/me/
- **Action**: Update the current User Profile data.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 200
    - Data: {firstname, surname, email, date}
<br />


### Ads:
#### POST /ads/
- **Action**: Create a new ad.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 201
    - Data: Full Newly Created Ad
<br />

#### GET /ads/me/
- **Action**: Get all ads of current user.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: List of all ads of the user
<br />

#### GET /ads/me/:adId
- **Action**: Get the data of one specific ad.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: Full Data of Ad 
<br />

#### DELETE /ads/me
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
    - Success Status: 200
    - Data: Full Newly Updated Ad
<br />

### Marketplaces:
#### POST /marketplaces/
- **Action**: Create a new Marketplace.

- **Returns**: 
    - Failure Status: 400
    - Success Status: 201
    - Data: 
<br />

#### GET /marketplaces/me
- **Action**: Get all Marketplaces of current user.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: List of all Marketplaces [{username, marketplace}] 
<br />

#### Get /marketplaces/me/:marketplaceId
- **Action**: Get data of a specific Marketplace.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: {username, marketplace}
<br />

#### DELETE /marketplaces/me/
- **Action**: Delete all marketplaces of current user.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data: 
<br />

#### DELETE /marketplaces/me/:marketplaceId
- **Action**: Delete a specific Marketplace.

- **Returns**: 
    - Failure Status: 404
    - Success Status: 200
    - Data:
<br />

#### PATCH /marketplaces/me/:marketplaceId
- **Action**: Update specific Marketplace (Only username allowed to be updated).

- **Returns**: 
    - Failure Status: 400
    - Success Status: 200
    - Data: {username, marketplace}
<br />

## Worth Mentioning:

### Microservices:
I used Microservices in this Application, which is defnitly an overkill with the current functionality. But in the future when the functionality is added to actually post ads on The different marketplaces, Microservices start to make sense. One can then have one Micorservice for each Marketplace, which has the big benefit if one marketplaces changes it functionality/ code/ requirments and the Micorservice fails, all the other Services will not be affected.
I used [cote](https://www.npmjs.com/package/cote) which is a Zero Configaration Micorservices tool, which makes it fairly easy to set up. But this comes with the limitation that one has minimum power over customizing how services interact with eachother.   

### Authentication:

- For each Authentication I do not need to make a request to the DB thus saving a lot of computing power and time
- Using Jwt to create tokens for Authentication
- Each token expires within 2h of creation
- Many routes are protected by a Authentication Middleware I created that confirms that the token in the **cookies** is valid and was not blacklisted. If the token is valid then the user Id is taken out of the token and is passed on with the request to the route. 
- if someone logs out before the token is expired the token goes on a **Blacklist** (incase the token was stolen from the client side)
-  Each time a user loggs out the Blacklist is updated and all expired tokens are removed from the Blacklist 

### Saving Imgs:
- When sending data to the Post ad route, one has the option either to send links to where the imgs are saved in the "imgLinks" key, or through form data in a "photos:" and then the web app will upload the photos to [Cloudinary](https://cloudinary.com/) and save the links in the links in the "imgLinks:" key.


### Caching:
- When a client makes a request to get all ads, the webapi forwards the request to the ads Microservice, which then makes the request to the DB. Then the list of ads is send back on the same route to the client. 
- To make this as efficient as possible I am caching the list of ads, in the webAPIGateway.
- Whenever a client makes a request to get all ads, it is first checked if a cache for the user is there and if so the cache is send back.
- Whenever an ad or ads are deleted, updated or created the cache is deleted. 
- The cache is also deleted after 2h, which is the same duration for tokens to expire

## Testing

This application can only be tested locally. 

To do so clone this repo and install all dependencies.

Next you'll need to remove the logs from cote, otherwise you'll run into problems when testing.

To Remove the logging from cote go to node_modules\cote\src\components\discovery.js and in default Options change log to false.

next start the required microservices with:
```bash
npm run test-services
```

Run the tests with:
```bash
npm run tests
```