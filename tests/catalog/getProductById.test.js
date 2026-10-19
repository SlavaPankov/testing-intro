const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  describe('товар существует', () => {
    test.each([
      ['ID 1 возвращает products[0]', 1, 0],
      ['ID 4 возвращает products[3]', 4, 3],
      ['ID 6 возвращает products[5]', 6, 5],
    ])('%s', (_title, id, expectedIndex) => {
      const result = getProductById(products, id);

      expect(result).toBe(products[expectedIndex]);
    });
  });

  describe('числовой ID отсутствует', () => {
    test.each([
      ['ID 0 возвращает null', 0],
      ['ID 999 возвращает null', 999],
      ['ID -1 возвращает null', -1],
    ])('%s', (_title, id) => {
      expect(getProductById(products, id)).toBeNull();
    });
  });

  describe('ID неверного типа', () => {
    test.each([
      ["строковый ID '1' возвращает null", '1'],
      ['ID undefined возвращает null', undefined],
      ['ID NaN возвращает null', NaN],
    ])('%s', (_title, id) => {
      expect(getProductById(products, id)).toBeNull();
    });
  });
});
