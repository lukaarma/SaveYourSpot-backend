type Error = {
    code: number,
    status: number,
    type: string,
    message: string
}

type ErrorsCollections = 'INTERNAL' | 'AUTH' | 'USER';

function asErrorsCollection<T extends { [key in ErrorsCollections]: { [key: string]: Error } }>(arg: T): T {
    return arg;
}

export default asErrorsCollection({
    INTERNAL: {
        BAD_TOKEN: {
            code: 55,
            status: 500,
            type: 'TokenDecodingError',
            message: 'Error decoding auth token, please authenticate again.'
        },
        USER_NOT_FOUND: {
            code: 50,
            status: 500,
            type: 'UserNotFound',
            message: 'Could not find the user associated with the token.'
        }
    },
    AUTH: {
        INVALID_TOKEN: {
            code: 101,
            status: 401,
            type: 'InvalidToken',
            message: 'Invalid or expired token, please authenticate again.'
        },
        ACCESS_DENIED: {
            code: 103,
            status: 403,
            type: 'AccessDenied',
            message: "You don't have permission to acces these resources \n" +
                'This attempt has been logged'
        }
    },
    USER: {
        INVALID_EMAIL: {
            code: 105,
            status: 400,
            type: 'InvalidEmail',
            message: 'This is not a valid email'

        },
        EMAIL_ALREADY_TAKEN: {
            code: 107,
            status: 400,
            type: 'EmailAlreadyTaken',
            message: 'This is email is already taken'
        },
        INVALID_PASSWORD: {
            code: 109,
            status: 400,
            type: 'InvalidPassword',
            message: 'Illegal character inserted. Plesae use only lowecase and uppercase letter, numbers and $@!%*?&'

        },
        PASSWORDS_DONT_MATCH: {
            code: 111,
            status: 400,
            type: 'PasswordDontMatch',
            message: "Passwords don't match"
        },
        INVALID_NAME: {
            code: 113,
            status: 400,
            type: 'InvalidName',
            message: 'This is not a valid name'

        },
        INVALID_BIRTHDATE: {
            code: 115,
            status: 400,
            type: 'InvalidBirthDate',
            message: 'This is not a valid birth date'
        },
        REQUIRED_FIELD: {
            code: 199,
            status: 400,
            type: 'RequiredField',
            message: 'This field is required'

        }
    }
});
