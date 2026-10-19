function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

const validateQuantity = (quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError(`Количество должно быть целым положительным числом, получено: ${quantity}`);
  }
}

function addToCart(cart, product, quantity = 1) {
  validateQuantity(quantity);

  const existingItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError(
        `Недостаточно товара на складе: запрошено ${nextQuantity}, доступно ${product.stock}`,
    );
  }

  if (!existingItem) {
    return [...cart, { ...product, quantity: nextQuantity }];
  }

  return cart.map((item) => (item.id === product.id ? { ...item, quantity: nextQuantity } : item));
}
function changeQuantity(cart, productId, quantity) {
  validateQuantity(quantity);

  const existingItem = cart.find((item) => item.id === productId);

  if (!existingItem) {
    return [...cart];
  }

  if (quantity > existingItem.stock) {
    throw new RangeError(
        `Недостаточно товара на складе: запрошено ${quantity}, доступно ${existingItem.stock}`,
    );
  }

  return cart.map((item) => (item.id === productId ? { ...item, quantity } : item));
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
