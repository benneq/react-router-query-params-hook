interface UpdateStateOptions {
    keepUrl?: boolean;
    force?: boolean;
    push?: boolean;
}
export declare const useQueryParamsFactory: <T>(parseQueryStringFn: (queryString: string) => T, formatQueryStringFn: (params: T) => string, factoryDefaultOptions?: UpdateStateOptions | undefined) => <P>(deserializeFn: (params: T) => P, serializeFn: (params: P) => T, defaultOptions?: UpdateStateOptions | undefined) => [P, (val: P, options?: UpdateStateOptions | undefined) => void];
export {};
