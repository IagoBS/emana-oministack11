const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const connection = require('./database/conection');

const routes = express.Router();

/**
 routes.get('/ongs', async(request, response) => {
     const ongs = await connection('ongs').select('*');
     return response.json(ongs);
 });
 * 
 */
routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.store);


routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id/', IncidentController.delete);

routes.get('/profiles', ProfileController.index);
module.exports = routes;