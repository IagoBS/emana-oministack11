const connection = require('../database/conection');
const crypto = require('crypto');
const { index } = require('./OngController');


module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [countCases] = await connection('incidents').count();
        console.log(countCases);
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.telephone',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header("X-TOTAL-COUNT", countCases['count(*)']);

        return response.json(incidents);
    },

    async store(request, response) {
        const { title, descripition, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            ong_id,
            title,
            descripition,
            value,
        });


        return response.json({ id });

    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: "Operação não permitida" });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();


    }
}