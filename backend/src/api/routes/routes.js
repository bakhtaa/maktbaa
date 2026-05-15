module.exports = app => {
    const router = require('express').Router();

    const livreController = require('../controllers/livre.controller');
    const auteurController = require('../controllers/auteur.controller');

    //routes livres
    router.post('/livres', livreController.create);
    router.get('/livres', livreController.findAll);
    router.get('/livres/:id', livreController.findOne);
    router.put('/livres/:id', livreController.update);
    router.delete('/livres/:id', livreController.delete);

    //routes auteurs
    router.post('/auteurs', auteurController.create);
    router.get('/auteurs', auteurController.findAll);
    router.get('/auteurs/:id', auteurController.findOne);
    router.put('/auteurs/:id', auteurController.update);
    router.delete('/auteurs/:id', auteurController.delete);

    app.use('/api/', router);
}