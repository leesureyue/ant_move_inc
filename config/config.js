export default {
    plugins: [
        ['umi-plugin-react', {
          antd: true,
          dva: true,
          locale: {
            enable: true,
        },
        }],
      ],
      routes: [{
          path:'/',
          component:'./index'
        },{
          path:'/user/order',
          component:'./user/orderlist'
        },
        {
          path:'/user/info',
          component:'./user/userinfo'
        },
        {
            path:'/shop/detail',
            component:'./user/detail'
        },{
            path:'/shop/cart',
            component:'./user/cart'
        },
        {
            path:'/shop/category',
            component:'./user/category'
        },
        {
        path: '/layout',
        component: './layout/BasicLayout',
        routes:[{
            path:'/layout',
            component:'./dashboard/ShopInfo'
            },{
            path:'dashboard',
            routes:[
              {path:'service',component:'./dashboard/ServiceManager'},
              {path:'evaluate',component:'./dashboard/EvaluateManager'},
              {path:'order',component:'./dashboard/OrderManager'},
              {path:'analysis',component:'./dashboard/Analysis'},
              {path:'info',component:'./dashboard/ShopInfo'}
            ]
        }]
      }]
}