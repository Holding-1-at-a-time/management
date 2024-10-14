/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:24:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// lib/logger.ts
import pino from 'pino'

/**
 * Initializes a logger with the specified log level and transport configuration.
 */


const logger = pino({
    level: process.env.LOG_LEVEL ?? 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
})

export default logger