import { createSlice } from '@reduxjs/toolkit';
import { logout, setCredentials } from './authSlice';

const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

const getCartStorageKey = () => {
  const user = getUserFromStorage();
  return user?.id ? `cart_user_${user.id}` : 'cart_guest';
};

const loadCart = () => {
  try {
    const key = getCartStorageKey();
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const loadCartByKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  const key = getCartStorageKey();
  localStorage.setItem(key, JSON.stringify(items));
};

const clearCartStorage = () => {
  const key = getCartStorageKey();
  localStorage.removeItem(key);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.items.find(i => i._id === item._id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
      saveCart(state.items);
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity >= 1) {
        const item = state.items.find(i => i._id === id);
        if (item) item.quantity = quantity;
        saveCart(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      clearCartStorage();
    }
  },
  extraReducers: (builder) => {
  // When user logs in, switch to their persisted cart using the user id in the payload
  builder.addCase(setCredentials, (state, action) => {
    const userId = action.payload?.user?.id;
    const key = userId ? `cart_user_${userId}` : 'cart_guest';
    state.items = loadCartByKey(key);
  });

  // When user logs out, switch to the shared guest cart explicitly (do not rely on localStorage.user timing)
  builder.addCase(logout, (state) => {
    state.items = loadCartByKey('cart_guest');
  });
},
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
