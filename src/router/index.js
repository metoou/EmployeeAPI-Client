import Vue from 'vue'
import Router from 'vue-router'

import Employee from '../components/Employee'
import Department from '../components/Department'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Employee},
        {path: '/department', component: Department}
    ]
})