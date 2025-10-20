import { createStore } from 'vuex';
import cart from './cart.js';
import orderHistory from './orderhistory.js';

export default createStore({
  modules: {
    cart,
    orderHistory

  }
});
