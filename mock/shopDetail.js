export default{
    'post /shop/detail':function(req,res,next){
        res.json({data:{
          id:1,
          title:"shop Title 1",
          desc:'shop desc content one mock data',
          rate:4,
          isExcellent:'',
          serviceList: [{
              id:1,
              title:'serviceList1',
              description:'description1',
              price: 128
          },{
              id:2,
              title:'serviceList2',
              description:'description2占位占位',
              price: 368
          }],
          phone:'18236551812',
          imageUrls:'/src/images/need-helps.png',
          address:'浙江省杭州市西湖区飞天园区'
      }});
    }
}