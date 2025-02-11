 'use client'
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js'
import { users } from "../../../../public/data/users";
import Image from "next/image";
import { FaPowerOff } from "react-icons/fa";

interface Message {
    username: string;
    text: string;
}

const DashboardUser = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    

    

    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const pathSegment = window.location.pathname.split("/");
            const usernameFromPath = pathSegment[pathSegment.length - 1];
            if (user?.username !== usernameFromPath) {
                router.push('/');
            } else {
                setCurrentUsername(usernameFromPath);
            }
        }

        const pusher =new Pusher('57b73c62d5ab9f5c78e4',{
            cluster:'mt1',
            useTLS:true,
        });

        const channel = pusher.subscribe('my-channel');

        channel.bind('messages',function(data){
            setMessages((prevMessages)=>[...prevMessages,data.message]);
        });
        

        
       
        const savedMessages = localStorage.getItem("messages");
        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages);
                if (Array.isArray(parsedMessages)) {
                    setMessages(parsedMessages);
                } else {
                    console.error("Invalid messages data:", parsedMessages);
                    setMessages([]);
                }
            } catch (error) {
                console.error("Error parsing messages:", error);
                setMessages([]);
            }
        }
        return()=>{
            pusher.unsubscribe('my-channel');
        };
        
    }, [user, router]);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (currentUsername !== null) {
            if (!user) {
                router.push('/');
            } else if (user.username !== currentUsername) {
                router.push('/');
            } else {
                setLoading(false);
            }
        }
    }, [user, currentUsername, router]);
     const newMessage: Message = {
            username: user?.username || "",
            text: message,
        };

    const handleSendMessage = async () => {
        await fetch('/api/send-message',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newMessage),
        });
        setMessage('');

       
    };

   
    if (loading) {
        return <p>Loading ... </p>
    }

    return (
        <div className="container ">
           < div className="w-5/6 m-auto mt-5">
            <div className=" pl-10 flex ">
                <div className="text-start w-1/2">
            <p className="px-4 text-3xl text-orange py-4">{user?.username}</p>
            </div>
            <div className="w-1/2 text-end mt-8 px-4">
            <button onClick={logout} className="text-end text-orange"><FaPowerOff className="size-5" /></button></div>
            </div>
            <div className="flex flex-col gap-3 p-4 bg-limegreen rounded-lg h-[70vh] overflow-y-auto scrollbar-custom">
                {Array.isArray(messages) &&
                messages.map((msg, index) => {
                    const isCurrentUser = msg.username === user?.username;
                    const userAvatar = users?.find((u)=>u.username === msg.username)?.avatar || "";
                    return(
                        <div key={index} className={`flex items-center gap-2 py-3  ${
                            isCurrentUser ? "flex-row-reverse self-end":"self-start"
                        } `} >
                            <Image src={userAvatar} alt={msg.username} width={40} height={40} className="pb-2"/>
                            <div 
                        className={`flex  max-w-[60%] py-2  rounded-lg text-start ${
                            isCurrentUser ? "bg-gold text-charcoal self-end rounded-tr-none pr-16"
                            :"bg-charcoal text-orange pr-16 self-start rounded-tl-none "
                        }`}>
                            <div className="m-2">
                            <span className="px-1 text-lg font-mono">{msg.username}:</span>
                            <span className="px-1 text-lg ">{msg.text}</span></div>
                            </div>
                        </div>);
                })}
            </div>
            <div className=" w-full my-5 flex text-center justify-center">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-5/6  py-2 ml-2 rounded-lg outline-none bg-gold text-charcoal" />
                    <div className="mt-3 ">
                <button onClick={handleSendMessage} className="ml-8 items-start bg-orange py-3 px-6 rounded-lg">Send</button></div>
            </div>
            
        </div>
        </div>
    );
};

export default DashboardUser;