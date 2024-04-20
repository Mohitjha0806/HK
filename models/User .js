// models/User.js

const { Model } = require('objection');


class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'email', 'mobile'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                mobile: { type: 'string', pattern: '^(?:\\+?88)?01[3-9]\\d{8}$' } // Regular expression for Bangladeshi mobile numbers
            }
        };
    }
}

module.exports = User;
