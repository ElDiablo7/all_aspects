'use client';

import { useState } from 'react';
import { getSiteConfig } from '@/lib/site-config';

export default function GraceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent'|'user', text: string}[]>([
    { role: 'agent', text: "Hi, I'm Grace. To give you the most accurate help, what kind of job do you need?" }
  ]);
  const [input, setInput] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = getSiteConfig();

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMsgs);
    setInput('');
    
    // Simulate simple state machine
    setTimeout(() => {
       const qtys = newMsgs.filter(m => m.role === 'user').length;
       let reply = '';
       if (qtys === 1) reply = "Great. And what postcode or area are you located in?";
       else if (qtys === 2) reply = "Thanks! Roughly how big is the job or what's your budget range?";
       else if (qtys === 3) reply = "Got it. When are you hoping to start this work?";
       else reply = "Based on that, the next best step is a proper quote. Please click the 'Get Quote' button so our experts can call you back!";
       
       setMessages(prev => [...prev, { role: 'agent', text: reply }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-slate-900 text-amber-500 text-3xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 border-2 border-slate-700 cursor-pointer"
        aria-label="Open Chatbot"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-slate-200 flex flex-col h-[500px]">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-xl">
                G
              </div>
              <div>
                <h3 className="font-bold">GRACE-X</h3>
                <p className="text-xs text-slate-300">Sales Qualifier</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat" className="text-slate-300 hover:text-white text-2xl font-bold cursor-pointer">&times;</button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
             {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    m.role === 'user' ? 'bg-amber-500 text-slate-900 rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
             ))}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 bg-slate-100 border-transparent rounded-full focus:ring-2 focus:ring-amber-500 outline-none text-sm text-slate-800"
            />
            <button onClick={handleSend} aria-label="Send Message" className="w-10 h-10 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center cursor-pointer">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
