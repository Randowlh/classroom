import Vue from 'vue'
import VueRouter from "vue-router";

const AdminHome = () => import('../views/admin/home/Home')
const Login = () => import('../views/Login')
const Register = () => import('../views/Register')
//const AdminLog = () => import('../views/admin/AdminLog')
const AdminClassroom = () => import('../views/admin/AdminClassroom')
//const AdminNotice = () => import('../views/admin/AdminNotice')
//const AdminUser = () => import('../views/admin/AdminUser')
const UserIndex = () => import('../views/user/Index')
const UserHome = () => import('../views/user/home/Home')
const UserClassroom = () => import('../views/user/Classroom')
const UserSelect = () => import('../views/user/Select')
const UserSignIn = () => import('../views/user/SignIn')

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        component: AdminHome,
        children: [
            // {
            //     path: '/adminLog',
            //     component: AdminLog
            // },
            // {
            //     path: '/adminNotice',
            //     component: AdminNotice
            // },
            // {
            //     path: '/adminUser',
            //     component: AdminUser
            // },
            {
                path: '/adminClassroom',
                component: AdminClassroom
            }
        ]
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/',
        component: UserIndex
    },
    {
        path: '/user/:id',
        component: UserHome,
        children:[
            {
                path: '/userClassroom/:id',
                component: UserClassroom
            },
            {
                path: '/userSelect/:cid/:uid',
                component: UserSelect
            },
            {
                path: '/userSignIn/:id',
                component: UserSignIn
            }
        ]
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router