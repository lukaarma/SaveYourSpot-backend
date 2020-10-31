type Error = {
    code: number,
    type: string,
    message: string
}

type ErrorsCollections = 'AUTH' | 'USER';

function asErrorsCollection<T extends { [key in ErrorsCollections]: { [key: string]: Error } }>(arg: T): T {
    return arg;
}


export default asErrorsCollection({
    AUTH: {
        INVALID_TOKEN: {
            code: 101,
            type: 'InvalidToken',
            message: 'Invalid or expired token, please authenticate again.'
        }
    },
    USER: {

    }
});
