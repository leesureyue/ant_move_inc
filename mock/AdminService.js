export default{
  'get /admin/getOrderList':function(req,res,next){
    res.json({
      "code": "200",
      "msg": "success",
      "success": true,
      "current": 1,
      "pageSize": 10,
      "totalCount": 2,
      "data": [
           
      ]
  })
  }
}