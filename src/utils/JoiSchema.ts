import Joi from 'joi';

const date14YearsAgo = new Date(Date.now() - 14 * 365 * 24 * 60 * 60 * 1000);

const user = Joi.object({
    email: Joi.string()
        .pattern(new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]{1,252}(?:\.[a-zA-Z0-9]{2,})+$/")),

    password: Joi.string()
        .pattern(new RegExp("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])([a-zA-Z\d$@!%*?&]{8,}$)$/")),

    repeat_password: Joi.ref('password'),

    firstName: Joi.string()
        .pattern(new RegExp("/^[\p{L}][ \p{L}'-]*[\p{L}]$/u")),

    lastName: Joi.string()
        .pattern(new RegExp("/^[\p{L}][ \p{L}'-]*[\p{L}]$/u")),

    phoneNumber: Joi.string(),

    birthdate: Joi.date()
        .max(date14YearsAgo),

})
    .options({
        presence: "required"
    }) 