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
            {
                "id": 1,
                "orderId": 1552023046677,
                "info": "非常好！！！",
                "createTime": "2019-03-27T20:45:37.000+0000",
                "rate": 5,
                "isDelete": false,
                "userName": "leesure"
            }
        ]})
    },
    'get /shop/getShopDetail':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,
        "data": {
            "id": 2019032261,
            "title": "test",
            "desc": "test",
            "rate": 0,
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
            ]
        }})
    }
}