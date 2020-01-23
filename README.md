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
    sh cli.sh run
    ```

Nodejs mode  

* in file ./src/config.js **change**  
* from 'mongodb://mongo:27017/api'  
* to 'mongodb://localhost:27017/api'  
start redis  
start mongodb  
npm start

Open in browser [Main page](http://localhost:3000/api)

Exposed endpoints:  
    GET /api  
    GET /api/product  
    GET /api/product/:id  
    POST /api/product  
    PUT /api/product/:id  
    DELETE /api/product/:id  
