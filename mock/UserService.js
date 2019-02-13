let user={
    name:'lee',
    password:'123'
}
//moke data 
export default {
    'post /login':function(req,res,next){
        res.json({result:user})
    },
    'post /register':function(req,res,next){
        res.json({result:user})
    }
}