export function mergeConfigObject(
    host: Record<string, unknown>,
    partial: Record<string, unknown>,
    token?: string
): Record<string, unknown> {
    if (token) {
        host[token] = partial;
        return partial;
    }
    Object.assign(host, partial);
}
