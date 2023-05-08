import { Request, Response } from "express";
import { User } from "../entities/User";
import { validateUserData } from "../middlewares/validations/user.validation";
import { AppDataSource } from "../config/datasource.config"
import { previewImg } from "./preview.controller";


export const userDetail =  async(req: Request, res: Response )=>{
  try{
    
    const valid = validateUserData(req.body);
    
    if(valid.error){
      // throw new Error("User provided invalid details");
      res.status(400).json({error:valid.error.details[0].message})
    }else{
      // const imageUrl = { previewImg };
      const newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.phone = req.body.phone;
      newUser.address = req.body.address;
      newUser.password = req.body.password;
      // newUser.fileLink = imageUrl as any;
      newUser.fileLink = req.body.fileLink;

      await AppDataSource.manager.save(newUser);
      res.status(200).json({message:"data saved", userDetails:newUser});
    }    
  }catch(err){
    res.status(500).json(err);
  }
  
};