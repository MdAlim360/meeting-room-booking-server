import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // Extract value within double quotes using regex
    const match = err.message.match(/dup key: { email: "([^"]+)" }/);

    // The extracted value will be in the first capturing group
    let extractedMessage = '';
    if (match) {
        extractedMessage = match[1];
    }

    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Duplicate error',
        errorSources,
    };
};

export default handleDuplicateError;