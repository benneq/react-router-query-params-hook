import { useState, useEffect, useContext } from 'react';
import * as Router from 'react-router';
const __RouterContext = (Router as any).__RouterContext;



interface UpdateStateOptions {
    keepUrl?: boolean
    force?: boolean
    // merge?: boolean
}



export const useQueryParamsFactory = <T>(
    parseQueryStringFn: (queryString: string) => T,
    formatQueryStringFn: (params: T) => string
) => {
    return <P>(
        deserializeFn: (params: T) => P,
        serializeFn: (params: P) => T
    ): [P, (val: P, options?: UpdateStateOptions) => void] => {
        const routerContext = useContext<any>(__RouterContext);
        const queryString = routerContext.location.search;

        const queryStringToParams = (queryString: string) => {
            return deserializeFn(parseQueryStringFn(queryString));
        };

        const paramsToQueryString = (params: P) => {
            return formatQueryStringFn(serializeFn(params));
        };

        const [params, setParams] = useState(() => queryStringToParams(queryString));
        const [normalizedQueryString, setNormalizedQueryString] = useState(() => paramsToQueryString(params));

        useEffect(() => {
            const params = queryStringToParams(queryString);
            updateState(params, { keepUrl: true });
        }, [queryString]);

        const updateState = (params: P, { keepUrl, force }: UpdateStateOptions = {}) => {
            const formatted = paramsToQueryString(params);
    
            if(force || normalizedQueryString !== formatted) {
                setParams(params);
                setNormalizedQueryString(formatted);
                if(!keepUrl) {
                    routerContext.history.replace({
                        search: formatted
                    });
                }
            }
        };

        return [params, updateState];
    }
}