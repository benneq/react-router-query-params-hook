var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState, useEffect, useContext } from 'react';
import * as Router from 'react-router';
var __RouterContext = Router.__RouterContext;
export var useQueryParamsFactory = function (parseQueryStringFn, formatQueryStringFn, factoryDefaultOptions) {
    return function (deserializeFn, serializeFn, defaultOptions) {
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
        var updateState = function (params, options) {
            var _a = __assign({}, factoryDefaultOptions, defaultOptions, options), keepUrl = _a.keepUrl, force = _a.force, push = _a.push;
            var formatted = paramsToQueryString(params);
            if (force || normalizedQueryString !== formatted) {
                setParams(params);
                setNormalizedQueryString(formatted);
                if (!keepUrl) {
                    var location_1 = { search: formatted };
                    var history_1 = routerContext.history;
                    if (push) {
                        history_1.push(location_1);
                    }
                    else {
                        history_1.replace(location_1);
                    }
                }
            }
        };
        return [params, updateState];
    };
};
