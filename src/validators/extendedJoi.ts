import { parsePhoneNumber } from 'libphonenumber-js';
import Joi, { Extension, StringSchema } from 'joi';

type CustomStringSchema = {
    phoneNumber(): CustomStringSchema
} & StringSchema;

const phoneExtension = (joi: typeof Joi): Extension => {
    return {
        base: joi.string(),
        type: 'string',
        messages: {
            'phoneNumber.invalid': "'{{#label}}' is not a valid phone number"
        },
        rules: {
            phoneNumber: {
                validate(value: string, helpers): any {
                    try {
                        const phone = parsePhoneNumber(value);
                        if (!phone.isValid()) {
                            throw new Error();
                        }
                    }
                    catch (error) {
                        return helpers.error('phoneNumber.invalid');
                    }

                    return value;
                }
            }
        }
    };
};


type customJoiType = {
    string(): CustomStringSchema
} & typeof Joi;

export default Joi.extend(phoneExtension) as customJoiType;
