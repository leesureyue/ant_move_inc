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
        path: '/',
        component: './layout/BasicLayout',
        routes:[{
            path:'/helloword',
            component:'./HelloWord'
        },{
            path:'/dashboard',
            routes:[
                {path:'/dashboard/analysis',component:'./dashboard/Analysis'},
                {path:'/dashboard/monitor',component:'./dashboard/Monitor'},
                {path:'/dashboard/workplace',component:'./dashboard/Workplace'}
            ]
        }]
      }]
}