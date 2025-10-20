import { createWebHistory, createRouter } from 'vue-router'

import Login2 from './Lab/login2.vue'
import Sanpham from './Lab/sanpham.vue'
import Register from './Lab/register.vue'
import Chitiet from './Lab/chitiet.vue'
import User from './Lab/user.vue'
import Userchitiet from './Lab/userchitiet.vue'

const routes = [
    // { path: '/', name: 'Home', component: ListPostView, meta: { isAuth: false } },
    // { path: '/posts', name: 'PostList', component: ListPostView, meta: { isAuth: false } },
    // { path: '/posts/:id', name: 'PostDetail', component: PostDetailView, meta: { isAuth: false } },
    // { path: '/login', name: 'Login', component: Login, meta: { isAuth: false } },
    // { path: '/profile', name: 'Profile', component: Profile, meta: { isAuth: true } },
    { path: '/register', name: 'Register', component: Register, meta: { isAuth: false } },
    { path: '/login', name: 'Login', component: Login2, meta: { isAuth: false } },
    { path: '/sanpham', name: 'Sanpham', component: Sanpham, meta: { isAuth: false } },
    { path: '/chitiet/:id', name: 'Chitiet', component: Chitiet, meta: { isAuth: false } },
    { path: '/user', name: 'User', component: User, meta: { isAuth: false } },
    { path: '/userchitiet/:id', name: 'Userchitiet', component: Userchitiet, meta: { isAuth: false } },
    
   
   
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