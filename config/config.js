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
            path:'/shop/detail',
            component:'./user/detail'
        },{
            path:'./shop/cart',
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
            component:'./dashboard/Analysis'
            },{
            path:'dashboard',
            routes:[
                {path:'analysis',component:'./dashboard/Analysis'},
                {path:'monitor',component:'./dashboard/Monitor'},
                {path:'workplace',component:'./dashboard/Workplace'}
            ]
        }]
      }]
}