# react-if-else-hoc

Functions that return React higher-order components used for conditional rendering.

[![NPM](https://img.shields.io/npm/v/react-if-else-hoc.svg)](https://www.npmjs.com/package/react-if-else-hoc)

## Install

```bash
npm install --save react-if-else-hoc
```

## Usage

* [ifElse](#ifelse)
* [or](#or)
* [orNothing](#ornothing)

### `ifElse()`

```js
ifElse(
    predicate: (props: Object) => boolean,
    IfComponent: ReactComponent
): HigherOrderComponent
```

Accepts a predicate that is called with `props` and returns a boolean, and an `IfComponent` which should be rendered if the predicate returns a truthy value.

Returns a higher-order component, which will render the supplied component when the predicate fails.

```jsx
const Hello = <div>Hello</div>
const Goodbye = <div>Goodbye</div>

const helloIfArrivingElse = ifElse(
    props => props.isArriving,
    Hello
)

const ReasonableStatement = helloIfArrivingElse(Goodbye)

// alternatively
const ReasonableStatement = ifElse(
    props => props.isArriving,
    Hello,
    Goodbye
)

...

<ReasonableStatement isArriving={ true } />
```

### `or()`

```js
or(
    AlternativeComponent: ReactComponent,
    predicate: (props: Object) => boolean
): HigherOrderComponent
```

Accepts an alternative component and a predicate that is called with `props` and returns a boolean.

Returns a higher-order component, which will render the supplied component when the predicate passes, and the alternative component otherwise.

```jsx
const Loader = <div>Loading...</div>
const orLoader = or(Loader, props => props.hasLoaded)

const SomeData = ({ data }) => <div>{ data }</div>

const SomeDataIfLoaded = orLoader(SomeData)

...

<SomeDataIfLoaded hasLoaded={ true } data={ data } />

// alternatively

const orLoader = or(Loader)

const SomeDataIfLoaded = orLoader(
    props => props.hasLoadedSpecificResource,
    SomeData
)

...

<SomeDataIfLoaded
    hasLoadedSpecificResource={ true }
    data={ data }
/>
```

### `orNothing()`

```js
or(
    predicate: (props: Object) => boolean
): HigherOrderComponent
```

Accepts a predicate that is called with `props` and returns a boolean.

Returns a higher-order component, which will render the supplied component when the predicate passes, and `null` otherwise.

## License

MIT
