let data={
    id:1,
    title:"shop Title 1",
    desc:'shop desc content one mock data',
    rate:4,
    isExcellent:'',
    serviceList: [],
    phone:'18236551812',
    imageUrls:'/src/images/need-helps.png',
    address:'浙江省杭州市西湖区飞天园区'
}


export default{
    'post /shop/detail':function(req,res,next){
        res.json({data:data});
    }

}