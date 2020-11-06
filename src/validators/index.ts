import customJoi from './extendedJoi';

export const validateUser = customJoi.object({
    email: customJoi.string()
        .trim()
        .pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]{1,252}(?:\.[a-zA-Z0-9]{2,})+$/),

    password: customJoi.string()
        .trim()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])([a-zA-Z\d$@!%*?&]{8,}$)$/),

    repeatPassword: customJoi.ref('password'),

    firstName: customJoi.string()
        .trim()
        .pattern(/^[\p{L}][ \p{L}'-]*[\p{L}]$/u),

    lastName: customJoi.string()
        .trim()
        .pattern(/^[\p{L}][ \p{L}'-]*[\p{L}]$/u),

    phoneNumber: customJoi.string()
        .trim()
        .phoneNumber(),

    birthdate: customJoi.date()
        // min 14 years old
        .max(new Date(Date.now() - 14 * 365 * 24 * 60 * 60 * 1000)),
});
