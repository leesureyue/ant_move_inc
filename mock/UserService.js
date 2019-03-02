let user={
    name:'lee',
    password:'123',
    role:'user'
}

//ajax 
export default {
    'post /login':function(req,res,next){
        res.json({result:user})
    },
    'post /register':function(req,res,next){
        res.json({result:user})
    }
}