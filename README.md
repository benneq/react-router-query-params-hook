# react-router-query-params-hook
React Hook for React Router for De-/Serializing query params

## Installation 
```sh
npm install react-router-query-params-hook
```

## Usage
First you have to create your actual `useQueryParams` hook. `react-router` only
returns a string for `location.search`, though you have to provide your own functions
for de-/serializing the query string.

You can for example use `qs`:
```ts
export const useQueryParams = useQueryParamsFactory(
    (queryString) => qs.parse(queryString, { ignoreQueryPrefix: true }),
    (params) => qs.stringify(params, { encode: true, addQueryPrefix: true })
);
```

Now your `useQueryParams` hook is ready for use:
```ts
// The input value of deserializer is the output of `qs.parse` (or whatever you use)
const deserializer = (value) => ({
    foo: value.foo ? Number.parseInt(value.foo) : undefined
});

// The return value of serializer is the input of `qs.stringify` (or whatever you use)
const serializer = (value) => ({
    foo: value.foo ? value.foo.toString() : undefined
});

// if you don't want to use an additional serializer, you
// can just pass an identity function for de-/serializer:
// (value) => value

export const MyComponent: React.FunctionComponent<Props> = (props) => {
    const [params, setParams] = useQueryParams(deserializer, serializer);

    useEffect(() => {
        console.log("Params Changed", params);
    }, [params]);

    return (
        <>
            Params: {JSON.stringify(params)}<br />
            <button onClick={() => setParams({foo:42})}>Set Params</button>
        </>
    )
};
```