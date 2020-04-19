const connection = require('../database/conection');
const crypto = require('crypto');
module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async store(request, response) {
        const { name, email, telephone, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            telephone,
            city,
            uf
        });

        return response.json({ id });
    }


}