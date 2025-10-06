import { registerUser, loginUser} from "../services/auth.service.js";   

export const register = async(req,res) =>{
    try{
        const {full_name,email,password,role} = req.body;
        const result = await registerUser({full_name,email,password,role});
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const result = await loginUser({email,password});
        res.status(200).json(result);
    } catch(error){
        res.status(400).json({message: error.message});
    }
};