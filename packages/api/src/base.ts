export interface TypedRestBase
    extends Record<string, Partial<Record<AcceptedMethods, TypedRestRoute>>> {}

export interface TypedRestRoute<
    B = unknown,
    R = unknown,
    P = unknown,
    Q = unknown
> {
    params?: P;
    query?: Q;
    body?: B;
    response: R;
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

export type TypedRestIndexedBase<
    T extends Record<
        string,
        Partial<Record<AcceptedMethods, TypedRestRoute>>
    > = Record<string, Partial<Record<AcceptedMethods, TypedRestRoute>>>
> = {
    [K in keyof T]?: { [M in AcceptedMethods]?: T[K][M] };
};

/*
export type TypedRestIndexedBase<
    R extends TypedRestBaseRoutes = TypedRestBaseRoutes
> = {
    [K in keyof R]: { [PK in keyof R[K]]: TypedRestRoute };
};
 */
