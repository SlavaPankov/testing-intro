const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

const getIds = (items) => items.map((item) => item.id);

describe('filterByCategory', () => {
  describe('все категории', () => {
    test.each([
      ["'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", 'all'],
      ['undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]', undefined],
      ['пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', ''],
    ])('%s', (_title, category) => {
      const result = filterByCategory(products, category);

      expect(getIds(result)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('существующая категория', () => {
    test.each([
      ["'electronics' возвращает товары с ID [1, 2]", 'electronics', [1, 2]],
      ["'books' возвращает товары с ID [3, 6]", 'books', [3, 6]],
      ["'home' возвращает товары с ID [4, 5]", 'home', [4, 5]],
    ])('%s', (_title, category, expectedIds) => {
      const result = filterByCategory(products, category);

      expect(getIds(result)).toEqual(expectedIds);
    });
  });

  describe('несуществующая категория', () => {
    test.each([
      ["'clothes' возвращает пустой массив", 'clothes'],
      ["'toys' возвращает пустой массив", 'toys'],
      ["'sports' возвращает пустой массив", 'sports'],
    ])('%s', (_title, category) => {
      const result = filterByCategory(products, category);

      expect(result).toEqual([]);
    });
  });
});
