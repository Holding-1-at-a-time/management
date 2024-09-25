/**
    * @description      : 
    * @author           : rrome
    * @group            : 
    * @created          : 25/09/2024 - 13:33:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/09/2024
    * - Author          : rrome
    * - Modification    : 
**/
// lib/errors.ts
export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = 400,
        public isOperational: boolean = true
    ) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        Error.captureStackTrace(this)
    }
}