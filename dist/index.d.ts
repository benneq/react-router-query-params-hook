interface UpdateStateOptions {
    keepUrl?: boolean;
    force?: boolean;
}
export declare const useQueryParamsFactory: <T>(parseQueryStringFn: (queryString: string) => T, formatQueryStringFn: (params: T) => string) => <P>(deserializeFn: (params: T) => P, serializeFn: (params: P) => T) => [P, (val: P, options?: UpdateStateOptions | undefined) => void];
export {};
