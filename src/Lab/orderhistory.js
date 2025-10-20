const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');

export default {
  namespaced: true,
  state: () => ({
    orders: savedOrders // ✅ khởi tạo từ localStorage
  }),

  mutations: {
    // Thêm đơn hàng mới vào lịch sử
    addOrder(state, order) {
      const newOrder = {
        ...order,
        status: order.status || "Chưa nhận hàng" 
      };
      state.orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },

    // Cập nhật trạng thái đơn hàng theo ID
    updateOrderStatus(state, { id, status }) {
      const order = state.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(state.orders));
      }
    },

    // Ghi đè toàn bộ danh sách đơn hàng (nếu cần)
    setOrders(state, orders) {
      state.orders = Array.isArray(orders) ? orders : [];
      localStorage.setItem('orders', JSON.stringify(state.orders));
    },

    // Xóa toàn bộ lịch sử đơn hàng
    clearOrders(state) {
      state.orders = [];
      localStorage.removeItem('orders');
    }
  },

  getters: {
    // Trả về toàn bộ đơn hàng
    allOrders(state) {
      return state.orders;
    }
  }
};