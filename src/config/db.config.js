const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect( process.env.MONGO_URL_1 ); 
}

module.exports = connect;