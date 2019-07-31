# elcabackend
This is the backend for the church social app: elcaconnect.com
It has the API which handles authentication, fetching users, and fetching bible content.
### Installation
first clone this repo

install nodejs

In the project directory, run 

 `npm install --dev`

to install all the dependencies

This backend uses MongoDB for the database, so install that as well

### Configuration

Before you can use run the application, you need to add a config file

Here is an example .env that I use on development server

```
MONGODB_URI= "mongodb://localhost:27017/church"
SECRET_OR_KEY = "thisisasecretorkeykeepthisfromeveryoneelse"
BIBLE_API_KEY = "thisisanapikeyformakingrequeststothescriptureapi"
BIBLE_API_URL = "https://api.scripture.api.bible/v1/bibles"
PORT = 3001
```
The bible component of the api is actually just a wrapper for the Scriptures API, more information here:

https://scripture.api.bible/

### Running locally

To run this app locally, simply run:

`node server.js`

The nodemon dev dependency, if installed, allows you to run a hot reloading version: 

`nodemon server.js`
