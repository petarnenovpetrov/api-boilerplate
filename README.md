# api-boilerplate  

Simple API boilerplate with  
    express  
    mongo  
    redis  
    jest  

## How to

### Pre requirments

Stop all mongo and redis services  

Docker mode
in project main folder

    ```bash
    npm install 
    sh cli.sh run
    ```
Run bot/simulating user activities/:

    ```bash
    npm run devBot
    ```
Look at the file: bot.log

Nodejs mode  

* in file ./src/config.js **change**  
* from 'mongodb://mongo:27017/api'  
* to 'mongodb://localhost:27017/api'  
start redis  
start mongodb  
npm start
npm run devBot

Open in browser [Main page](http://localhost:3000/api)

Exposed endpoints:  
    GET /api  
    GET /api/product  
    GET /api/product/:id  
    POST /api/product  
    PUT /api/product/:id  
    DELETE /api/product/:id  
