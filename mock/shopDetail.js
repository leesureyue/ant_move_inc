export default{
    'post /shop/getShopDetail':function(req,res,next){
        res.json({
          "code": "200",
          "msg": "success",
          "success": true,
          "data": {
              "id": 2019032261,
              "title": "test",
              "desc": "test",
              "rate": 5,
              "isExcellent": false,
              "phone": "18236551812",
              "address": "河南大学软件学院",
              "imageUrls": null,
              "serviceList": [
                  {
                      "id": 1,
                      "shopId": 2019032261,
                      "title": "service01",
                      "desc": "service01",
                      "rate": 3,
                      "price": "180",
                      "isDelete": false
                  }
              ]}
      });
    },
    'get /shop/getEvaluateList':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,
        "current": 1,
        "pageSize": 10,
        "totalCount": 2,
        "data": [
            {
                "id": 1,
                "orderId": 1552023046677,
                "info": "非常好！！！",
                "createTime": "2019-03-27T20:45:37.000+0000",
                "rate": 5,
                "isDelete": false,
                "userName": "leesure"
            },
            {
                "id": 2,
                "orderId": 1552023046678,
                "info": "测试服务器测试评论",
                "createTime": "2019-03-31T18:18:12.000+0000",
                "rate": 3,
                "isDelete": false,
                "userName": "leesure"
            }
        ]
    })
    },
    'post /shop/queryByConditions':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,
        "data": [
            {
                "shopId": 2019032261,
                "shopTitle": "test",
                "shopIntroduce": "test",
                "rate": 3,
                "shopAddress": "河南大学软件学院",
                "phone": "18236551812",
                "shopEmail": "18236551812@qq.com"
            }
        ]
    })
    },
    'get /shop/getServiceList':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,
        "current": 1,
        "pageSize": 10,
        "totalCount": 2,
        "data": [
            {
                "id": 1,
                "shopId": 2019032261,
                "title": "service01",
                "desc": "service01",
                "rate": 3,
                "price": "300",
                "isDelete": false
            },
            {
                "id": 2,
                "shopId": 2019032261,
                "title": "service02",
                "desc": "service02",
                "rate": 4,
                "price": "250",
                "isDelete": false
            }
        ]
    })
    }
}