<script setup>
import { useStore } from 'vuex';
import { computed, reactive, onMounted } from 'vue';

const store = useStore();
const orders = computed(() => store.getters['orderHistory/allOrders'] || []);

// Tạo trạng thái tạm để chỉnh sửa
const tempStatus = reactive({});

// Gán trạng thái ban đầu cho từng đơn hàng
onMounted(() => {
  orders.value.forEach(order => {
    tempStatus[order.id] = order.status;
  });
});

const saveStatus = (id) => {
  const status = tempStatus[id];
  store.commit('orderHistory/updateOrderStatus', { id, status });
  alert(`Đã lưu trạng thái đơn ${id}: ${status}`);
};
</script>

<template>
  <div class="admin-orders">
    <h2>Quản lý đơn hàng</h2>

    <div v-if="orders.length === 0" class="empty">
      Không có đơn hàng nào.
    </div>

    <table v-else class="order-table">
      <thead>
        <tr>
          <th>Mã đơn</th>
          <th>Ngày đặt</th>
          <th>Phương thức</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.method }}</td>
          <td>{{ order.total.toLocaleString() }}₫</td>
          <td class="status-cell">
            <div class="status-wrapper">
              <select v-model="tempStatus[order.id]">
                <option value="Chưa nhận hàng">Chưa nhận hàng</option>
                <option value="Đã nhận hàng">Đã nhận hàng</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button @click="saveStatus(order.id)" class="save-btn">Lưu</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-orders {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
}

h2 {
  font-size: 26px;
  margin-bottom: 24px;
  text-align: center;
  color: #2c3e50;
}

.empty {
  text-align: center;
  font-size: 16px;
  color: #666;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 14px;
}

.order-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.status-cell {
  text-align: left;
}

.status-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.status-wrapper select {
  flex: 1;
  padding: 6px;
  border-radius: 4px;
}

.save-btn {
  padding: 6px 12px;
  font-size: 13px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-btn:hover {
  background-color: #1565c0;
}
</style>