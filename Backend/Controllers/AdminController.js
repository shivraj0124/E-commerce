const handleAdmin=async(req,res)=>{
    try{
 res.send({
    success:true,
    message:"Done"
 })
    }catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

module.exports ={
    handleAdmin
}