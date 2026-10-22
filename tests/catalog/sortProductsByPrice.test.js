const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getIds = (items) => items.map((product) => product.id);
const pickByIds = (ids) => ids.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  describe('по возрастанию', () => {
    test.each([
      ["все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", products, ['asc'], [3, 6, 5, 4, 2, 1]],
      ['все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', products, [], [3, 6, 5, 4, 2, 1]],
      ["товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", pickByIds([1, 3, 4]), ['asc'], [3, 4, 1]],
    ])('%s', (_title, items, args, expectedIds) => {
      const result = sortProductsByPrice(items, ...args);

      expect(getIds(result)).toEqual(expectedIds);
    });
  });

  describe('по убыванию', () => {
    test.each([
      ["все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", products, [1, 2, 4, 5, 6, 3]],
      ["товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", pickByIds([3, 1, 4]), [1, 4, 3]],
      ["товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", pickByIds([5, 2, 6]), [2, 5, 6]],
    ])('%s', (_title, items, expectedIds) => {
      const result = sortProductsByPrice(items, 'desc');

      expect(getIds(result)).toEqual(expectedIds);
    });
  });

  describe('исходный массив не меняется', () => {
    test.each([
      ["'asc' не меняет исходный массив [1, 3, 4]", pickByIds([1, 3, 4]), ['asc'], [1, 3, 4]],
      ["'desc' не меняет исходный массив [1, 3, 4]", pickByIds([1, 3, 4]), ['desc'], [1, 3, 4]],
      ['направление по умолчанию не меняет исходный массив всех товаров', products, [], [1, 2, 3, 4, 5, 6]],
    ])('%s', (_title, items, args, expectedIds) => {
      const result = sortProductsByPrice(items, ...args);

      expect(result).not.toBe(items);
      expect(getIds(items)).toEqual(expectedIds);
    });
  });
});
