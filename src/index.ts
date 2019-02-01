import { useState, useEffect, useCallback, useContext, Context } from 'react';
import * as Router from 'react-router';
const __RouterContext = (Router as any).__RouterContext as Context<Router.RouteComponentProps>;



interface UpdateStateOptions {
    keepUrl?: boolean
    force?: boolean
    push?: boolean
    // merge?: boolean
}



export const useQueryParamsFactory = <T>(
    parseQueryStringFn: (queryString: string) => T,
    formatQueryStringFn: (params: T) => string,
    factoryDefaultOptions?: UpdateStateOptions
) => {
    return <P>(
        deserializeFn: (params: T) => P,
        serializeFn: (params: P) => T,
        defaultOptions?: UpdateStateOptions
    ): [P, (val: P, options?: UpdateStateOptions) => void] => {
        const routerContext = useContext(__RouterContext);
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

        const updateState = useCallback((params: P, options?: UpdateStateOptions) => {
            const { keepUrl, force, push }: UpdateStateOptions = {...factoryDefaultOptions, ...defaultOptions, ...options};
            const formatted = paramsToQueryString(params);
    
            if(force || normalizedQueryString !== formatted) {
                setParams(params);
                setNormalizedQueryString(formatted);
                if(!keepUrl) {
                    const location = { search: formatted };
                    const history = routerContext.history;
                    
                    if(push) {
                        history.push(location);
                    } else {
                        history.replace(location);
                    }
                }
            }
        }, [normalizedQueryString, routerContext.history]);

        return [params, updateState];
    }
}