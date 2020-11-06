type Error = {
    code: number,
    status: number,
    type: string,
    message: string,
    details?: string
}

type ErrorsCollections = 'GENERAL' | 'AUTH' | 'USER';

function asErrorsCollection<T extends { [key in ErrorsCollections]: { [key: string]: Error } }>(arg: T): T {
    return arg;
}

export default asErrorsCollection({
    GENERAL: {
        MISSING_FIELD: {
            code: 10,
            status: 400,
            type: 'MissingField',
            message: 'Required field missing.',
            details: undefined
        } as Error,
        USER_NOT_FOUND: {
            code: 50,
            status: 500,
            type: 'UserNotFound',
            message: 'Could not find the user associated with the token.'
        } as Error,
        BAD_TOKEN: {
            code: 55,
            status: 500,
            type: 'TokenDecodingError',
            message: 'Error decoding auth token, please authenticate again.'
        } as Error
    },
    AUTH: {
        INVALID_TOKEN: {
            code: 101,
            status: 401,
            type: 'InvalidToken',
            message: 'Invalid or expired token, please authenticate again.'
        } as Error,
        ACCESS_DENIED: {
            code: 103,
            status: 403,
            type: 'AccessDenied',
            message: "You don't have permission to acces these resources \n" +
                'This attempt has been logged'
        }as Error
    },
    USER: {
        INVALID_EMAIL: {
            code: 105,
            status: 400,
            type: 'InvalidEmail',
            message: 'This is not a valid email'

        } as Error,
        EMAIL_ALREADY_TAKEN: {
            code: 107,
            status: 400,
            type: 'EmailAlreadyTaken',
            message: 'This is email is already taken'
        } as Error,
        INVALID_PASSWORD: {
            code: 109,
            status: 400,
            type: 'InvalidPassword',
            message: 'Illegal character inserted. Plesae use only lowecase and uppercase letter, numbers and $@!%*?&'

        } as Error,
        PASSWORDS_DONT_MATCH: {
            code: 111,
            status: 400,
            type: 'PasswordDontMatch',
            message: "Passwords don't match"
        } as Error,
        INVALID_NAME: {
            code: 113,
            status: 400,
            type: 'InvalidName',
            message: 'This is not a valid name'

        } as Error,
        INVALID_BIRTHDATE: {
            code: 115,
            status: 400,
            type: 'InvalidBirthDate',
            message: 'This is not a valid birth date'
        } as Error,
        REQUIRED_FIELD: {
            code: 199,
            status: 400,
            type: 'RequiredField',
            message: 'This field is required'

        } as Error
    }
});
