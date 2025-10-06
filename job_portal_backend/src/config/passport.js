import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { findUserByEmail, createUser } from "../models/user.model.js";

dotenv.config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
async(accessToken,refreshToken,profile,done)=>{
    try{
        const google_id=profile.id;
        const email=profile.emails[0].value;
        const full_name=profile.displayName;

        let user=await findUserByEmail(email);
        if(user&&!user.google_id) return done(new Error('Email already registered with another method'),null);

        if(!user){
            user = await createUser({
                full_name,
                email,
                google_id,
                password_hash:null,
                role:'job_seeker',
            });
        }
        done(null, user);
    } catch(error){
        done(error, null);
    }
})
);
