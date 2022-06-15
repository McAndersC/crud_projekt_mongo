// Requires
const express = require('express');
const path = require('path');
const users = require('./users');
// const database = require('./database');

// Constants.
const expressServer = express();
expressServer.use(express.json());
expressServer.use(express.static('client'));
expressServer.use(express.urlencoded({
    extended: true
}));

// Skab kontakt til database
// database.connect();

// Server Module.
const server = {};

/*


    Endpoints til klient routes


*/

// Route til vores Klient forside.
expressServer.get('/', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/index.html'))

})

// Route til vores Klient create side.
expressServer.get('/create', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/create.html'))

})

// Route til vores Klient create side.
expressServer.get('/query', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(__dirname, '../client/query.html'))

})


/*


    Endpoints til backend routes


*/


// Register
expressServer.post('/users/register', (req, res) => {

    users.registerUser(req.body, (code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    })
})

expressServer.post('/users/query', (req, res) => {

    console.log('BODY', req.body)
    users.getUsersByQuery(req.body, (code, returnObj) => {
        //res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    })
})

expressServer.delete('/users/delete/:username', (req, res) => {

    users.deleteUserByUsername(req.params.username, (code, returnObj) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send({'message' : returnObj});
    })

})

expressServer.get('/users/all', (req, res) => {

    users.getAllUsers((code, returnObj) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(code);
        res.send(returnObj);

    })
})


// 404
expressServer.get('*', (req, res) => {
  
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.status(404);
    res.sendFile(path.resolve(__dirname, '../client/404.html'))

})

// Starter Express server, og vi lytter på requests/forespørgelser.
server.run = () => {

    console.log('Starter server')

    expressServer.listen(3000, () => {

        console.log('Server er startet, lytter på port 3000');

    });



}

// Exporting our server module object.
module.exports = server;