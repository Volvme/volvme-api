const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Volvme', {useNewUrlParser: true, autoIndex: false});
const db = mongoose.connection;
module.exports = db;
