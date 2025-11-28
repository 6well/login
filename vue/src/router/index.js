import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from "@/views/Register.vue";

Vue.use(VueRouter)


const routes = [
  {
    path:'/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log('路由守卫 - 目标:', to.path);

  // 需要认证的页面
  const authPages = ['/home']; // 添加需要保护的路由

  if (authPages.includes(to.path)) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('路由守卫: 未登录，跳转到登录页');
      next('/login');
      return;
    }
  }

  next();
});

export default router
