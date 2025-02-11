'use client'
import Cookies from "js-cookie";
import { createContext,ReactNode, useContext, useState } from "react";
import { users } from "../../../public/data/users";

interface User{
    id:number;
    username:string;
}

interface AuthContextType{
    user:User | null;
    login:(username:string,password:string)=>boolean;
    logout:()=>void
   
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps{
    children:ReactNode
}
export const AuthProvider=({children}:AuthProviderProps)=>{
    const [user,setUser]=useState<User | null>(()=>{
        const token = Cookies.get("token");
         if(token){
            const foundUser = users.find((u)=>u.username === token);
            return foundUser ? {id:foundUser.id,username:foundUser.username,avatar:foundUser.avatar} :null;}
            return null;

    });

   
    const login =(username:string,password:string)=>{
        const foundUser = users.find((u)=>u.username=== username && u.password===password);
        if(foundUser){
            setUser({id:foundUser.id,username:foundUser.username,avatar:foundUser.avatar});
            Cookies.set("token",username,{expires: 1 / 24});
            return true;
        }
        return false;

    };

    const logout = ()=>{
        setUser(null);
        Cookies.remove("token");
    };
return(
        <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
    );

};

export const useAuth=()=>{
    const context= useContext(AuthContext);
    if(!context){
        throw new Error ("Context not found");

    }
    return context;
}



    
