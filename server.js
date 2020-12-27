// Module calling 
const { MongoClient } = require("mongodb");
require('dotenv').config()

//cqui c'est passé c'est que windows a un mongodb qui tourne
//en natif sur 27017 (accessible en faisant localhost:27017 dans un navigateur)
//du coup afin d'accéder a celui du container il a fallu changer le port.
const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + 
            `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

const client = new MongoClient(uri, {useUnifiedTopology: true})

client.connect((err, res) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("Connection to MongoDB established")
})