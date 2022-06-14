
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';
const dbName = 'Crud';
const dbUserCollection = 'Users';
const users = {};

// Register User - Her opretter vi nye brugere til systemet.
users.registerUser = async (payload, callback) => {

    const db = await MongoClient.connect(dbUrl);
    const dbo = db.db(dbName);

    let query = {$or :[{ email: payload.email} , {username: payload.username}]};
    // let query = { username: payload.username };


    dbo.collection(dbUserCollection).find(query).toArray( async (err, user) => {

        if (err) {

            console.log(err)

          }
          
          if(user.length === 0)
          {
            
            const encryptedPassword = await bcrypt.hash(payload.password, 10);
            payload.password = encryptedPassword;

            dbo.collection(dbUserCollection).insertOne( payload, (err, user) => {
            
                if (err) {
                    console.log(err)
                }

                db.close();
            
                return callback(200, {'message':'Ny Bruger', 'data' : user});
            });

          } else {

            return callback(200, {'message':'Der findes allerede en bruger med denne email', 'data' : user});

          }

    });

}

module.exports = users;