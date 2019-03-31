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
        "totalCount": 1,
        "data": [
            
        ]})
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
    }
}