import { Record, Tuple } from '@bloomberg/record-tuple-polyfill';

import { convertToRecord, convertToTuple } from '.';

describe('Converters', () => {
  describe('Record', () => {
    it('fails to convert to record when not an object', () => {
      expect(() => convertToRecord(1)).toThrow();
      expect(() => convertToRecord('foo')).toThrow();
      expect(() => convertToRecord([])).toThrow();
    });

    it('handles an empty object', () => {
      expect(convertToRecord({})).toBe(Record({}));
    });

    it('converts a shallow object to a record', () => {
      expect(convertToRecord({ foo: 'bar' })).toBe(Record({ foo: 'bar' }));
    });

    it('converts a deep object to a record', () => {
      expect(
        convertToRecord({
          foo: { bar: 'baz', test: { object: 'with string' } },
        })
      ).toBe(
        Record({
          foo: Record({ bar: 'baz', test: Record({ object: 'with string' }) }),
        })
      );
    });

    it('converts arrays in objects to tuples', () => {
      expect(convertToRecord({ foo: ['bar', 'baz'] })).toBe(
        Record({ foo: Tuple('bar', 'baz') })
      );
    });
  });

  describe('Tuple', () => {
    it('fails to convert to tuple when not an array', () => {
      expect(() => convertToTuple(1)).toThrow();
      expect(() => convertToTuple('foo')).toThrow();
      expect(() => convertToTuple({})).toThrow();
    });

    it('handles an empty array', () => {
      expect(convertToTuple([])).toBe(Tuple())
    })

    it('converts a 1 dimensional array to a tuple', () => {
      expect(convertToTuple(['foo', 'bar', 'baz'])).toBe(
        Tuple('foo', 'bar', 'baz')
      );
    });

    it('converts a n dimensional array to a tuple', () => {
      expect(convertToTuple(['foo', ['bar', ['baz']]])).toBe(
        Tuple('foo', Tuple('bar', Tuple('baz')))
      );
    });

    it('converts an object inside an array to a record', () => {
      expect(convertToTuple(['foo', { bar: 'baz' }])).toBe(
        Tuple('foo', Record({ bar: 'baz' }))
      );
    });
  });
});
