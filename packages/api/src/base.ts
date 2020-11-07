export interface TypedRestBase {
    [route: string]: unknown;
}

export interface TypedRestRoute<
    B = unknown,
    R = unknown,
    P = unknown,
    Q = unknown
> {
    params?: P;
    query?: Q;
    body?: B;
    response?: R;
}

export type AcceptedMethods =
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "purge"
    | "PURGE"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK";

/**
 * Here for reference. It's not recommended to extend your API
 * definition from IndexedBase, because then your definition will
 * not cause errors when an invalid route is defined or called
 */

export type TypedRestIndexedBase<T = Record<string, unknown>> = {
    [K in keyof T]: Partial<Record<AcceptedMethods, TypedRestRoute>>;
};

/*
export type TypedRestIndexedBase<
    R extends TypedRestBaseRoutes = TypedRestBaseRoutes
> = {
    [K in keyof R]: { [PK in keyof R[K]]: TypedRestRoute };
};
 */
