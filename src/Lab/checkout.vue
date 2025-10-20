<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const items = computed(() => store.state.cart.items || []);
const total = computed(() => store.getters['cart/totalPrice']);
const paymentMethod = ref('COD');

const confirmOrder = () => {
  if (items.value.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }

  if (paymentMethod.value === 'COD') {
    alert("Đơn hàng đã được xác nhận. Thanh toán khi nhận hàng.");
    pushOrder();
  } else {
    alert("Chuyển đến cổng thanh toán VNPay...");
    pushOrder();
  }

  router.push('/user');
};

const pushOrder = () => {
  const order = {
    id: Date.now(),
    items: [...items.value],
    total: total.value,
    method: paymentMethod.value,
    date: new Date().toLocaleString(),
    status: "Chưa nhận hàng"
  };

  store.commit('orderHistory/addOrder', order);
  store.commit('cart/clearCart');
};
</script>

<template>
  <div class="checkout-container">
    <h2>Xác nhận đơn hàng</h2>

    <div v-if="items.length === 0" class="empty-cart">
      Không có sản phẩm nào trong giỏ hàng.
    </div>

    <ul v-else class="item-list">
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong> × {{ item.quantity }} — {{ item.price.toLocaleString() }}₫
      </li>
    </ul>

    <div v-if="items.length > 0" class="summary">
      <p><strong>Tổng tiền:</strong> {{ total.toLocaleString() }}₫</p>

      <div class="payment-method">
        <label><strong>Phương thức thanh toán:</strong></label>
        <label>
          <input type="radio" value="COD" v-model="paymentMethod" />
          Thanh toán khi nhận hàng (COD)
        </label>
        <label>
          <input type="radio" value="VNPay" v-model="paymentMethod" />
          Thanh toán qua VNPay
        </label>
      </div>

      <button class="confirm-btn" @click="confirmOrder">Xác nhận thanh toán</button>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 720px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 12px;
  background: linear-gradient(to bottom right, #ffffff, #f2f4f7);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

h2 {
  text-align: center;
  margin-bottom: 28px;
  font-size: 26px;
  color: #2c3e50;
  font-weight: 600;
}

.empty-cart {
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-top: 20px;
}

.item-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.item-list li {
  padding: 14px 18px;
  margin-bottom: 12px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
}

.item-list li:hover {
  background-color: #f0f0f0;
}

.summary {
  margin-top: 24px;
  font-size: 17px;
  color: #333;
}

.summary p {
  margin-bottom: 16px;
  font-weight: 500;
}

.payment-method {
  margin: 24px 0;
  padding: 20px;
  background-color: #eef3f8;
  border-radius: 10px;
  border: 1px solid #cfd8e3;
}

.payment-method label {
  display: block;
  margin-bottom: 12px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 15px;
}

.payment-method input[type="radio"] {
  margin-right: 10px;
  transform: scale(1.1);
}

.confirm-btn {
  display: block;
  width: 100%;
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 14px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-btn:hover {
  background-color: #1b5e20;
}
</style>