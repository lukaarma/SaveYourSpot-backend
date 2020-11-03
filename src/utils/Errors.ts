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
            message: "You don't have permission to acces these resources! \n" +
                'This attempt has been logged'
        }
    },
    USER: {
    }
});
