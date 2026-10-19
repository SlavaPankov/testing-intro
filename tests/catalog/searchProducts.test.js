const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const getIds = (items) => items.map((item) => item.id);

describe('searchProducts', () => {
  describe('точное совпадение', () => {
    test.each([
      ["'Наушники' возвращает товар с ID 1", 'Наушники', [1]],
      ["'Чистый код' возвращает товар с ID 6", 'Чистый код', [6]],
      ["'Настольная лампа' возвращает товар с ID 4", 'Настольная лампа', [4]],
    ])('%s', (_title, query, expectedIds) => {
      const result = searchProducts(products, query);

      expect(getIds(result)).toEqual(expectedIds);
    });
  });

  describe('регистр не влияет на поиск', () => {
    test.each([
      ["'javascript' возвращает товар с ID 3", 'javascript', [3]],
      ["'ЧЕХОЛ' возвращает товар с ID 5", 'ЧЕХОЛ', [5]],
      ["'наушники' возвращает товар с ID 1", 'наушники', [1]],
    ])('%s', (_title, query, expectedIds) => {
      const result = searchProducts(products, query);

      expect(getIds(result)).toEqual(expectedIds);
    });
  });

  describe('пустой запрос', () => {
    test.each([
      ['пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', ''],
      ['строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', '   '],
      ["'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", '\t\n'],
    ])('%s', (_title, query) => {
      const result = searchProducts(products, query);

      expect(getIds(result)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
