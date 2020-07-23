# Record and Tuple Converter

[![npm version](https://badge.fury.io/js/record-tuple-convert.svg)](https://www.npmjs.com/package/record-tuple-convert)

### Recursively convert JS objects and arrays to [Records and Tuples](https://github.com/tc39/proposal-record-tuple)

## Disclaimer

As the record and tuple proposal is still in it's early stages, this package is not using a finalized API, so breaking changes might be frequent.

Since Babel still yet doesn't have a transform for Records and Tuples, you'll need to use [@bloomberg/record-tuple-polyfill](https://github.com/bloomberg/record-tuple-polyfill).

## Usage

```javascript
const convertToRecord = require('record-tuple-convert').convertToRecord;
const convertToTuple = require('record-tuple-convert').convertToTuple;

// Convert simple objects
convertToRecord({ foo: 'bar' }); // -> #{ foo: 'bar' }

// Convert deep objects
convertToRecord({
  foo: {
    bar: 'baz'
  }
}); // #{ foo: #{ bar: 'baz' } }

// Convert simple arrays
convertToTuple(['foo', 'bar']); // -> #['foo', 'bar']

// Convert nth-dimensional arrays
convertToTuple(['foo', ['bar', ['baz']]]); // -> #['foo', #['bar', #['baz']]]

// Mix and match!

convertToRecord({ foo: ['bar'], baz: true }); // -> #{ foo: #['bar'], baz: true }

convertToTuple(['foo', { bar: 'baz' }]) // -> #['foo', #{ bar: 'baz' }]
```

## Contributing

This repo is open to issues and PRs, they are even encouraged!

To get setup, clone the repo, run `npm install` and follow the instructions at [@bloomberg/record-tuple-polyfill](https://github.com/bloomberg/record-tuple-polyfill) to install the polyfill.

To run the tests, run `npm test`.
