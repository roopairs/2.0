# Redux Tools

Redux Tools to make redux easy and reduce boilerplate with useful tools and conventions.

## Contents

-   [Getting Started](#getting-started)
-   [Models](#models)
    -   [The Problem](#the-problem)
    -   [The Solution](#the-solution)
    -   [Model Conventions](#model-conventions)
-   [API Reference](#api-reference)
    -   [Types](#types)
        -   [Basic](#basic)
        -   [Async](#async)
    -   [generateActionsAndTypes](#generateactionsandtypes)
    -   [models.create](#modelscreate)

## Getting Started

Please view the example folder to get a quick introduction or continue reading.

## Models

### The Problem

Does this folder structure look familiar to you?

```
src/
	actions/
		index.js
		products.js
		user.js
	components/
		App.js
		Header.js
		Product.js
	reducers/
		index.js
		products.js
		user.js
	selectors/
		index.js
		products.js
		user.js
	types/
		index.js
		products.js
		user.js
	index.js
	store.js
```

This is the basic organization shown in many different redux tutorials and examples. This works great until, one day, it doesn't. It becomes cumbersome to make changes across multiple folders when you're only really updating one **thing**. This is where models come in.

### The Solution

The solution is to place things together by domain rather than type. All fetching, updating, and calculating for a domain lives inside one model. This includes actions, types, reducers, selectors, sagas. So that example app structure using models would look like this:

```
src/
	components/
		App.js
		Header.js
		Product.js
	models/
		products/
			actions.js
			index.js
			reducer.js
			sagas.js
			selectors.js
		user/
			actions.js
			index.js
			reducer.js
			sagas.js
			selectors.js
		index.js
	index.js
	store.js
```

### Model Conventions

A model can be a folder with separate files for actions, reducer, selectors, etc. Or for simple models just a single file may be all you need (similar to [Ducks](https://github.com/erikras/ducks-modular-redux) in many ways). At the end of the day it will be an object with one or several of the following keys (each piece is optional):

-   **actions**
    -   an object where each key is an action creator function
-   **reducer**
    -   a reducer function for a branch of the state object, usually with the same name as the model itself
-   **sagas**
    -   a single saga function that will be forked by the root reducer
-   **selectors**
    -   an object of selector functions related to the model
-   **types**
    -   an object of `SNAKE_CASE` keys and `namespace/SNAKE_CASE` values for use in reducers and sagas (and anywhere else you need them)

Next let's look at each piece in a little more detail.

#### Actions and Types

This is what a typical definition for a type and action looks like:

```javascript
const SET_FIRST_NAME = 'user/SET_FIRST_NAME';
const setFirstName = (payload) => ({
	payload,
	type: SET_FIRST_NAME,
});
```

And that gets even more repetitive when you start dealing with asynchronous actions:

```javascript
const SAVE_REQUEST = 'user/SAVE_REQUEST';
const SAVE_SUCCESS = 'user/SAVE_SUCCESS';
const SAVE_FAILURE = 'user/SAVE_FAILURE';
const saveRequest = (payload) => ({
	payload,
	type: SAVE_REQUEST,
});
const saveSuccess = (payload) => ({
	payload,
	type: SAVE_SUCCESS,
});
const saveFailure = (payload) => ({
	payload,
	type: SAVE_FAILURE,
});
```

That repetition was a source of great angst for us so we thought there's a great opportunity for convention and tooling to reduce boilerplate.

The first step was to decide that since actions and types are so closely related anyway, why don't we explicitly couple them together?

##### Conventions for Actions and Types

-   **actions have a `type` and a `payload`**. Action creators will always accept a single parameter that will be placed onto the `payload` key of the action object.
-   **types will be `SNAKE_CASE` with a `namespace` of any case**
-   **action creators will have the `camelCase` version of the type's `SNAKE_CASE`** value.
-   **action creators will be generated automatically from types**

So using our conventions and adding in `redux-tools` tooling, we can greatly reduce the boilerplate for creating actions and types. Here's an equivalent of the above two examples:

```javascript
import { Async, Basic } from 'redux-tools/types';
import { generateActionsAndTypes } from 'redux-tools';

const { actions, types } = generateActionsAndTypes('user', [
	new Async('SAVE'),
	new Basic('SET_FIRST_NAME'),
	new Basic('SET_LAST_NAME'),
]);
```

#### Reducers

Model reducers are combined into the root reducer using Redux's `combineReducers` function.

#### Sagas

Model sagas are combined by `fork`ing each saga inside the root saga.

## API Reference

### Types

Use an implementation of the `Type` class when defining your types. Redux Tools comes with two types defined out of the box: `Async` and `Basic`.

#### Basic

When used with `generateActionsAndTypes`, this will result in a namespaced type and action creator.

```javascript
import { Basic } from 'redux-tools/types';
import { generateActionsAndTypes } from 'redux-tools';

const { actions, types } = generateActionsAndTypes('user', [new Basic('SET_FIRST_NAME')]);

console.log(actions);
// { setFirstName: (payload) => ({ payload, type: 'user/SET_FIRST_NAME' }) }

console.log(types);
// { SET_FIRST_NAME: 'user/SET_FIRST_NAME' }
```

#### Async

When used with `generateActionsAndTypes`, this will result in request, success, and failure action creators and types.

```javascript
import { Async } from 'redux-tools/types';
import { generateActionsAndTypes } from 'redux-tools';

const { actions, types } = generateActionsAndTypes('user', [new Async('SAVE')]);

console.log(actions);
/*
{
	saveRequest: (payload) => ({ payload, type: 'user/SAVE_REQUEST' }),
	saveSuccess: (payload) => ({ payload, type: 'user/SAVE_SUCCESS' }),
	saveFailure: (payload) => ({ payload, type: 'user/SAVE_FAILURE' }),
}
*/

console.log(types);
/*
types: {
	SAVE_REQUEST: 'user/SAVE_REQUEST',
	SAVE_SUCCESS: 'user/SAVE_SUCCESS',
	SAVE_FAILURE: 'user/SAVE_FAILURE',
}
*/
```

### generateActionsAndTypes

#### Arguments

1.  `namespace` (_string_)
2.  `types` (_array_)

#### Returns

```javascript
{
	actions: {},
	types: {},
}
```

#### Example

```javascript
import { Async, Basic } from 'redux-tools/types';
import { generateActionsAndTypes } from 'redux-tools';

const { actions, types } = generateActionsAndTypes('user', [
	new Async('SAVE'),
	new Basic('SET_FIRST_NAME'),
	new Basic('SET_LAST_NAME'),
]);

console.log(actions);
/*
{
	saveRequest: (payload) => ({ payload, type: 'user/SAVE_REQUEST' }),
	saveSuccess: (payload) => ({ payload, type: 'user/SAVE_SUCCESS' }),
	saveFailure: (payload) => ({ payload, type: 'user/SAVE_FAILURE' }),
	setFirstName: (payload) => ({ payload, type: 'user/SET_FIRST_NAME' }),
	setLastName: (payload) => ({ payload, type: 'user/SET_LAST_NAME' }),
}
*/

console.log(types);
/*
types: {
	SAVE_REQUEST: 'user/SAVE_REQUEST',
	SAVE_SUCCESS: 'user/SAVE_SUCCESS',
	SAVE_FAILURE: 'user/SAVE_FAILURE',
	SET_FIRST_NAME: 'user/SET_FIRST_NAME',
	SET_LAST_NAME: 'user/SET_LAST_NAME',
}
*/
```

### models.create

Function to combine your different models for use in your app. Typically used in the `index.js` file in your models directory.

#### Arguments

1.  `models` (_object_)

#### Returns

```javascript
{
	actions,
	reducer,
	sagas,
	selectors,
	types,
}
```

#### Example

```javascript
import app from './app';
import lists from './lists';
import { models } from 'redux-tools';
import todos from './todos';

export const { actions, reducer, sagas, selectors, types } = models.create({
	app,
	lists,
	todos,
});

console.log(actions);
/*
{
	app: { ... },
	lists: { ... },
	todos: { ... },
}
*/

// Root reducer function to use in your redux store
console.log(reducer);

// Root saga generator function to pass to the saga middleware
console.log(sagas);

console.log(selectors);
/*
{
	app: { ... },
	lists: { ... },
	todos: { ... },
}
*/

console.log(types);
/*
{
	app: { ... },
	lists: { ... },
	todos: { ... },
}
*/
```

## TODO

withErrorReporting: extend to allow raygun / crashalitics / error reporting system
withRetry: extend to allow raygun / crashalitics / error reporting system
