import User from "../../models/User.js";

class AuthController{
    async login(req,res){
        let {username,password} = req.body;
        let user = await User.findOne({username:username});
        if(user){
            let isMatch = await user.matchPassword(password);
            if(isMatch){
                let token = await user.getSignedJwtToken();
                res.status(200).json({
                    success:true,
                    token:token,
                    user:user
                });
            }else{
                res.status(200).json({
                    error:"Your password is incorrect"
                });
            }
        }else{
            return res.status(200).json({error:"User not found or check your username please"});
        }
    }
}

export default AuthController;