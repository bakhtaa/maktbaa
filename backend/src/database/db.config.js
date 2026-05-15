const config = require('../config/config');
const mongoose = require('mongoose');

const db = {};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url = config.DB_URL;

// nouveaux modèles
db.auteurs = require('../api/models/auteur.model')(mongoose);
db.livres = require('../api/models/livre.model')(mongoose);

module.exports = db;