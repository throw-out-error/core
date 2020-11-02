export interface ErrorOptions {
    message?: string;
    code?: string | number;
}

export class ImprovedError extends Error {
    code: string | number;

    constructor(opts: ErrorOptions) {
        super(opts.message);
        this.code = opts.code;
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ImprovedError.prototype);
    }
}

export class MissingOverrideError extends ImprovedError {
    constructor() {
        super({});

        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MissingOverrideError.prototype);
    }
}
