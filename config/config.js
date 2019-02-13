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
            path:'/register',
            component:'./form/Register'
        },
        {
        path: '/layout',
        component: './layout/BasicLayout',
        routes:[{
            path:'dashboard',
            routes:[
                {path:'analysis',component:'./dashboard/Analysis'},
                {path:'monitor',component:'./dashboard/Monitor'},
                {path:'workplace',component:'./dashboard/Workplace'}
            ]
        }]
      }]
}