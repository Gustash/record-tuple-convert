const Tuple = require('@bloomberg/record-tuple-polyfill').Tuple;
const Record = require('@bloomberg/record-tuple-polyfill').Record;

export function convertToTuple(arr) {
  if (!Array.isArray(arr)) {
    throw 'You can only convert an array to a tuple.';
  }

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return Tuple.from([...acc, convertToTuple(val)]);
    }

    if (typeof val === 'object') {
      return Tuple.from([...acc, convertToRecord(val)]);
    }

    return Tuple.from([...acc, val]);
  }, Tuple());
}

export function convertToRecord(obj) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    throw 'You can only convert an object to a record.';
  }

  return Object.keys(obj).reduce((acc, key) => {
    const val = obj[key];

    if (Array.isArray(val)) {
      return Record({ ...acc, [key]: convertToTuple(val) });
    }

    if (typeof val === 'object') {
      return Record({ ...acc, [key]: convertToRecord(val) });
    }

    return Record({ ...acc, [key]: val });
  }, Record({}));
}
