import chalk from 'chalk';
import { ValidationError } from 'joi';
import winston from 'winston';


export const logger: winston.Logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.json()
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
                winston.format.printf(
                    (item: winston.Logform.TransformableInfo) => customPrint(item)
                )
            )
        })
    ]
});

function customPrint (info: winston.Logform.TransformableInfo): string {
    if (info.level === 'error') {
        if (info.fatal) {
            return chalk.red('\n\n[FATAL ERROR] ') + (info.stack ?? info.message);
        }

        return chalk.red('\n[ERROR] ') + (info.stack ?? info.message) + '\n';
    }
    else if (info.level === 'warn') {
        return chalk.yellow('\n[WARNING] ') + info.message;
    }
    else if (info.level === 'info') {
        return info.message;
    }
    else if (info.level === 'verbose') {
        return chalk.cyan('\n[VERBOSE] ') + info.message;
    }
    else if (info.level === 'debug') {
        return chalk.magenta('\n[debug] ') + info.message;
    }

    return `${info.level}: ${info.message} - ${info.timestamp}`;
}


export function iterateValidationError(err: ValidationError): string {
    return '\n' +
        `_original: ${err._original}\n` +
        `details: ${err.details}\n` +
        `isJoi: ${err.isJoi}\n` +
        `message: ${err.message}\n` +
        `name: ${err.name}\n` +
        `stack: ${err.stack}\n`;
}
