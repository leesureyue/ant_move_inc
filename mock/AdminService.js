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
          {
              "id": 2039222618,
              "userId": 1549983823996,
              "serviceId": 1,
              "address": "河南",
              "destination": "杭州",
              "createTime": "2019-03-27T17:09:10.000+0000",
              "totalPay": 1028,
              "isDeleted": false,
              "orderState": "UNCOMMIT"
          },
          {
              "id": 1552023046677,
              "userId": 1549983823996,
              "serviceId": 2,
              "address": "河南",
              "destination": "开封",
              "createTime": "1000-01-01T00:00:00.000+0000",
              "totalPay": 1928,
              "isDeleted": false,
              "orderState": "COMMIT"
          }
      ]
  })
  },
  'get /admin/removeEvaluate':function(req,res,next){
    res.json({
      "code": "200",
      "msg": "success",
      "success": true,
      "data":true
    })
  },
  'post /admin/releaseService':function(req,res,next){
    res.json({
      "code": "200",
      "msg": "success",
      "success": true,
      "data":true
    })
  },
  'get /admin/offlineService':function(req,res,next){
    res.json({
      "code": "200",
      "msg": "success",
      "success": true,
      "data":true
    })
  }
}