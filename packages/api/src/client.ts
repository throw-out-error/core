import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    // Method as AcceptedMethods
} from "axios";
import {
    AcceptedMethods,
    TypedRestBase,
    TypedRestIndexedBase,
    TypedRestRoute,
} from "./base";

export interface TypedAxiosRequestConfig<
    API extends TypedRestBase,
    Path extends keyof API,
    Method extends keyof API[Path],
    RouteDef extends TypedRestRoute = API[Path][Method]
> {
    url?: Path;
    method?: Extract<Method, AcceptedMethods>;
    params?: RouteDef["query"];
    data?: RouteDef["body"];
}

export interface TypedAxiosResponse<
    API extends TypedRestBase,
    Path extends keyof API,
    Method extends keyof API[Path],
    RouteDef extends TypedRestRoute = API[Path][Method]
> {
    config: TypedAxiosRequestConfig<API, Path, Method>;
    data: RouteDef["response"];
    status: number;
    statusText: string;
    headers: any;
    request?: any;
}

export class TypedAxiosInstance<
    API extends TypedRestIndexedBase = TypedRestIndexedBase
> {
    client: AxiosInstance;

    constructor(client?: AxiosInstance) {
        this.client = client ?? axios.create({});
    }

    makeRequest<Path extends keyof API, M extends AcceptedMethods>(
        method: M,
        url: Path | string,
        config?: TypedAxiosRequestConfig<API, Path, M>,
        data?: API[Path]["POST"]["body"]
    ): Promise<TypedAxiosResponse<API, Path, M>> {
        switch (method.toLowerCase()) {
            case "delete":
                return this.client.delete(url as string, config as unknown);
            case "get":
                return this.client.get(url as string, config as unknown);
            case "head":
                return this.client.head(url as string, config as unknown);
            case "post":
                return this.client.post(url as string, config as unknown, data);
            case "put":
                return this.client.put(url as string, config as unknown, data);
            case "patch":
                return this.client.patch(
                    url as string,
                    config as unknown,
                    data
                );
        }
    }

    request<
        Path extends Extract<keyof API, AcceptedMethods>,
        Method extends keyof API[Path] = "GET"
    >(
        config: TypedAxiosRequestConfig<API, Path, Method>
    ): Promise<TypedAxiosResponse<API, Path, Method>> {
        return this.client.request(config);
    }

    get<Path extends keyof API>(
        url: Path,
        config?: TypedAxiosRequestConfig<API, Path, "GET">
    ): Promise<TypedAxiosResponse<API, Path, "GET">> {
        return this.makeRequest<Path, "GET">("GET", url, config);
    }

    delete<Path extends keyof API>(
        url: Path,
        config?: TypedAxiosRequestConfig<API, Path, "DELETE">
    ): Promise<TypedAxiosResponse<API, Path, "DELETE">> {
        return this.makeRequest<Path, "DELETE">("DELETE", url, config);
    }

    head<Path extends Extract<keyof API, AcceptedMethods>>(
        url: Path | string,
        config?: TypedAxiosRequestConfig<API, Path, "HEAD">
    ): Promise<TypedAxiosResponse<API, Path, "HEAD">> {
        return this.makeRequest<Path, "HEAD">("HEAD", url, config);
    }

    post<Path extends Extract<keyof API, AcceptedMethods>>(
        url: Path | string,
        data?: API[Path]["POST"]["body"],
        config?: TypedAxiosRequestConfig<API, Path, "POST">
    ): Promise<TypedAxiosResponse<API, Path, "POST">> {
        return this.makeRequest<Path, "POST">("POST", url, config, data);
    }

    put<Path extends Extract<keyof API, AcceptedMethods>>(
        url: Path | string,
        data?: API[Path]["PUT"]["body"],
        config?: TypedAxiosRequestConfig<API, Path, "PUT">
    ): Promise<TypedAxiosResponse<API, Path, "PUT">> {
        return this.makeRequest<Path, "PUT">("PUT", url, config, data);
    }

    patch<Path extends Extract<keyof API, AcceptedMethods>>(
        url: Path | string,
        data?: API[Path]["PATCH"]["body"],
        config?: TypedAxiosRequestConfig<API, Path, "PATCH">
    ): Promise<TypedAxiosResponse<API, Path, "PATCH">> {
        return this.makeRequest<Path, "PATCH">("PATCH", url, config, data);
    }
}
