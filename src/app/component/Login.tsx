'use client'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
    const {login}=useAuth();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const router=useRouter();
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        if(login(username,password)){
            router.push(`/dashboard/${username}`)
        }else{
            alert("username or password incorrect")
        }
    };

    return (
        <div className="container ">
        <div className=" w-1/2 m-auto justify-center  h-screen mt-10 py-9 ">
            <h2 className="text-4xl font-mono font-bold py-9 text-center text-gold">Login</h2>
            <div className="p-5">
            <form onSubmit={handleSubmit} className="ml-8">
                <div className="p-3">
                    <label className="px-4 text-gold">username</label>
                    <input className="bg-orange outline-none rounded-md py-1 mx-1"
                     type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="p-3">
                    <label className="px-4 text-gold">Password</label>
                    <input className="bg-orange outline-none rounded-md py-1 mx-1"
                     type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="text-center my-5 w-1/2 m-auto">
                
                <button type="submit" className="text-center w-full text-gold py-1 bg-limegreen">Login</button></div>


            </form>

        </div></div>
        </div>
      );
}
 
export default Login;