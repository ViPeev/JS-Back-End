const mongoose = require('mongoose');

//To do change database accordding to assignment
const CONNECTION_STRING = 'mongodb://localhost:27017/test'
module.exports = async (app) => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('Database connected');
    }catch(error){
        console.error(err.message);
        process.exit(1);
    }
}