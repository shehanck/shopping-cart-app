export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (acc, item) => acc + item.quantity * item.price * (1 - (item.discount || 0) / 100),
    0
  );