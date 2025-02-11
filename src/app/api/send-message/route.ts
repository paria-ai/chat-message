import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

// مقدارهای واقعی Pusher را از .env.local دریافت کنید
const pusher = new Pusher({
  appId: '1938698' as string,
  key: "57b73c62d5ab9f5c78e4" as string,
  secret: "caaf7e27d462b456deb0" as string,
  cluster: "mt1" as string,
  useTLS: true,
});

export  async function POST(req: NextRequest) {
  
    try {
        const body = await req.json();
      const { username,text } = body;

      if (!username || !text) {
        return NextResponse.json({ error: 'Message is required' },{status:400});
      }

      await pusher.trigger('my-channel', 'messages', { message:{
        username,
        text
      }
       });

      return NextResponse.json({ message: 'Message sent' },{status:200});
    } catch (error) {
      console.error('Pusher Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
  }

  