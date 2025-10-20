import { createWebHistory, createRouter } from 'vue-router'
import Home from './Lab/home.vue'
import Login2 from './Lab/login2.vue'
import Sanpham from './Lab/sanpham.vue'
import Register from './Lab/register.vue'
import Chitiet from './Lab/chitiet.vue'
import User from './Lab/user.vue'
import Userchitiet from './Lab/userchitiet.vue'
import UpdateUser from './Lab/UpdateUser.vue'
import Adminmanager from './Lab/adminmanager.vue'
import Catemanager from './Lab/catemanager.vue'
import Cartpage from './Lab/cartpage.vue'
import Checkout from './Lab/checkout.vue'
import Ordermanager from './Lab/ordermanager.vue'
import Orderhistory from './Lab/orderhistory.vue'   
import Favorite from './Lab/favorite.vue'


const routes = [
    // { path: '/', name: 'Home', component: ListPostView, meta: { isAuth: false } },
    // { path: '/posts', name: 'PostList', component: ListPostView, meta: { isAuth: false } },
    // { path: '/posts/:id', name: 'PostDetail', component: PostDetailView, meta: { isAuth: false } },
    // { path: '/login', name: 'Login', component: Login, meta: { isAuth: false } },
    // { path: '/profile', name: 'Profile', component: Profile, meta: { isAuth: true } },
    { path: '/home', name: 'Home', component: Home, meta: { isAuth: false } },
    { path: '/register', name: 'Register', component: Register, meta: { isAuth: false } },
    { path: '/login', name: 'Login', component: Login2, meta: { isAuth: false } },
    { path: '/sanpham', name: 'Sanpham', component: Sanpham, meta: { isAuth: false } },
    { path: '/chitiet/:id', name: 'Chitiet', component: Chitiet, meta: { isAuth: false } },
    { path: '/user', name: 'User', component: User, meta: { isAuth: false } },
    { path: '/userchitiet/:id', name: 'Userchitiet', component: Userchitiet, meta: { isAuth: false } },
    { path: '/updateuser', name: 'updateuser', component: UpdateUser, meta: { isAuth: false } },
    { path: '/adminmanager', name: 'Adminmanager', component: Adminmanager, meta: { isAuth: false } },
    { path: '/catemanager', name: 'Catemanager', component: Catemanager, meta: { isAuth: false } },
    { path: '/cartpage', name: 'Cartpage', component: Cartpage, meta: { isAuth: false } },
    { path: '/checkout', name: 'Checkout', component: Checkout, meta: { isAuth: false } },
    { path: '/ordermanager', name: 'Ordermanager', component: Ordermanager, meta: { isAuth: false } },
    { path: '/orderhistory', name: 'Orderhistory', component: Orderhistory, meta: { isAuth: false } },
    { path: '/favorite', name: 'Favorite', component: Favorite, meta: { isAuth: false } },
   
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        // component: NotFound,
        meta: { isAuth: true }
    },
]
const router = createRouter({
    history: createWebHistory(''),
    routes
})
/**
 * check permission
 * 
 */
router.beforeEach((to, from, next) => {
    const currentUser = localStorage.getItem('currentUser');
    if(to.meta.isAuth && currentUser){
        const user = JSON.parse(currentUser)
        console.log('user',user)
        if(!user.role)
        next({name: 'Login'});
    } else {
        next();
    }
})

export default router