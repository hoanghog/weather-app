const { isEmptyObject } = require('../../../src/lib/common');

describe('isEmptyObject', () => {
  it('should return true if object is empty', () => {
    const obj = {};

    const result = isEmptyObject(obj);
    expect(result).toBeTruthy();
  });

  it('should return false if object is not empty', () => {
    const obj = { a: '1' };

    const result = isEmptyObject(obj);
    expect(result).not.toBeTruthy();
  });
});