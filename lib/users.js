
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
            
           
            let dataToBeSaved = {
              name : payload.name,
              username : payload.username,
              email: payload.email,
              password : encryptedPassword,
              address : {
                zipcode : payload.zipcode,
                streetname : payload.streetname
              }
            }

            dbo.collection(dbUserCollection).insertOne( dataToBeSaved, (err, user) => {
            
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

users.getUsersByQuery = async (payload, callback) => {

  const db = await MongoClient.connect(dbUrl);
  const dbo = db.db(dbName);

  let query = payload;

  dbo.collection(dbUserCollection).find(query).toArray( async (err, users) => {

    if (err) {

      console.log(err)

    } 

    return callback(200, {'message':'Bruger via Query' + query, 'data' : users});

  })

}

users.getAllUsers = async (callback) => {

  const db = await MongoClient.connect(dbUrl);
  const dbo = db.db(dbName);
  let query = {};

  dbo.collection(dbUserCollection).find(query).toArray( async (err, users) => {
    if (err) {

      console.log(err)

    } 

    return callback(200, {'message':'alle brugere i systemet', 'data' : users});

  })

}

users.deleteUserByUsername = async (payload, callback) => {

  const db = await MongoClient.connect(dbUrl);
  const dbo = db.db(dbName);

    
    dbo.collection(dbUserCollection).deleteOne( {username : payload}, (err, user) => {
              
      if (err) {
        return callback(201, {'message':'Bruger findes ikke?'});
      }

      db.close();

      return callback(200, {'message':'Bruger er slettet', 'data' : user});
  });

}


module.exports = users;