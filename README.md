# E-commerce API v2

### Restful API can be customized for any ecommerce site!

Live API documentation: https://ecom-v2-hoangnguyen.netlify.app/

## Project structure
```
.
├── api
│   ├── controllers
│   │ 
│   ├── helpers
│   │  
│   ├── middlewares
│   │  
│   ├── models
│   │  
│   ├── routes
│   │ 
│   ├── services
│   │  
│   ├── validations
│   │   
│   └── views
├── config
│   
└── index.js
```

## Description
This is an update version of ecommerce-api-v1: https://github.com/sonhoang2503/eccommerce-api-v1

## Main Tools And Technologies 

* Nodejs( ExpressJS).
* MongoDB( mongoose).
* PassportJS,bcryptjs,session.
* Nodemailer,googleAPIs.
* Multer,cloudinary.
* Joi.

## Usage
You can fork the app or you can git-clone the app into your local machine. Once done that, please install all the
dependencies by running
```

$ npm install

!Set up your env variables 
$ npm run start
```
### Setting Up Your Local Environment

* In your .env file, set environment variables for the following:


```
NODE_ENV= 
PORT= 
DATABASE_URI=

GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=

CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

MAIL_SEND=
MAIL_CLIENT_ID=
MAIL_CLIENT_SECRET=

MAIL_REDIRECT_URI=
MAIL_REFRESH_TOKEN=
```


