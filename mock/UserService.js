export default {
    'post /user/login':function(req,res,next){
        res.json({
          "code": "200",
          "msg": "success",
          "success": true,
          "data": {
              "id": 1,
              "name": "lee",
              "password": "202cb962ac59075b964b07152d234b70",
              "phone": "18236551812",
              "email": "",
              "isAdmin": null,
              "avatar": null
          }
      })
    },
    'post /user/register':function(req,res,next){
        res.json({
          "code": "200",
          "msg": "success",
          "success": true,})
    },
    'post /user/queryOrder':function(req,res,next){
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
                "serviceId": 2019032261,
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
                "serviceId": 2019032261,
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
    'post /user/getUserInfo':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,
        "data": {
            "id": 1549983823996,
            "name": "leesure_modify",
            "password": "202cb962ac59075b964b07152d234b70",
            "phone": "18236551815",
            "email": "18236551812@qq.com",
            "isAdmin": null,
            "avatar": null
        }
    })
    },
    'post /user/createOrder':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,  
        "data": {
            "id": 1550004014446,
            "userId": 1549983823996,
            "serviceId": 1,
            "address": "杭州",
            "destination": "开封",
            "createTime": "2019-04-01T14:17:43.425+0000",
            "totalPay": 1800,
            "isDeleted": false,
            "orderState": "UNCOMMIT"
        }
    })
    },
    'get /user/submitOrder':function(req,res,next){
      res.json({
        "code": "200",
        "msg": "success",
        "success": true,  
        "data":true
      })
    }
}