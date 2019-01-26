import { useState, useEffect, useContext } from 'react';
import * as Router from 'react-router';
var __RouterContext = Router.__RouterContext;
export var useQueryParamsFactory = function (parseQueryStringFn, formatQueryStringFn) {
    return function (deserializeFn, serializeFn) {
        var routerContext = useContext(__RouterContext);
        var queryString = routerContext.location.search;
        var queryStringToParams = function (queryString) {
            return deserializeFn(parseQueryStringFn(queryString));
        };
        var paramsToQueryString = function (params) {
            return formatQueryStringFn(serializeFn(params));
        };
        var _a = useState(function () { return queryStringToParams(queryString); }), params = _a[0], setParams = _a[1];
        var _b = useState(function () { return paramsToQueryString(params); }), normalizedQueryString = _b[0], setNormalizedQueryString = _b[1];
        useEffect(function () {
            var params = queryStringToParams(queryString);
            updateState(params, { keepUrl: true });
        }, [queryString]);
        var updateState = function (params, _a) {
            var _b = _a === void 0 ? {} : _a, keepUrl = _b.keepUrl, force = _b.force;
            var formatted = paramsToQueryString(params);
            if (force || normalizedQueryString !== formatted) {
                setParams(params);
                setNormalizedQueryString(formatted);
                if (!keepUrl) {
                    routerContext.history.replace({
                        search: formatted
                    });
                }
            }
        };
        return [params, updateState];
    };
};
