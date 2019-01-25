"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Router = __importStar(require("react-router"));
var __RouterContext = Router.__RouterContext;
exports.useQueryParamsFactory = function (parseQueryStringFn, formatQueryStringFn) {
    return function (deserializeFn, serializeFn) {
        var routerContext = react_1.useContext(__RouterContext);
        var queryString = routerContext.location.search;
        var queryStringToParams = function (queryString) {
            return deserializeFn(parseQueryStringFn(queryString));
        };
        var paramsToQueryString = function (params) {
            return formatQueryStringFn(serializeFn(params));
        };
        var _a = react_1.useState(function () { return queryStringToParams(queryString); }), params = _a[0], setParams = _a[1];
        var _b = react_1.useState(function () { return paramsToQueryString(params); }), normalizedQueryString = _b[0], setNormalizedQueryString = _b[1];
        react_1.useEffect(function () {
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
