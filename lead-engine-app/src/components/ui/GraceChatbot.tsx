'use client';

import { useState, useRef, useEffect } from 'react';
import { getSiteConfig } from '@/lib/site-config';
import { chat } from '@/app/actions/chat';

export default function GraceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent'|'user', text: string}[]>([
    { role: 'agent', text: "Hi, I'm Grace. To give you the most accurate help, what kind of job do you need?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const config = getSiteConfig();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    const newMsgs = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMsgs);
    setInput('');
    setIsTyping(true);
    
    try {
      const chatMessages = newMsgs.map(m => ({
        role: (m.role === 'agent' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.text
      }));

      const siteContext = config.domain.includes('paving') ? 'paving' : 'building';
      const response = await chat(chatMessages, siteContext);
      
      if (response && response.text) {
        setMessages(prev => [...prev, { role: 'agent', text: response.text }]);
        speak(response.text);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = "I'm having a spot of trouble connecting. Please bear with me, or use the quote form if you're in a hurry!";
      setMessages(prev => [...prev, { role: 'agent', text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find Google UK English Female voice
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.name === 'Google UK English Female') || 
                        voices.find(v => v.lang === 'en-GB' && v.name.includes('Female')) ||
                        voices.find(v => v.lang === 'en-GB');
    
    if (targetVoice) {
      utterance.voice = targetVoice;
    }
    
    utterance.pitch = 1.15;
    utterance.rate = 1.12;
    utterance.lang = 'en-GB';
    
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full glass-dark text-amber-400 text-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 border border-white/20 cursor-pointer overflow-hidden group"
        aria-label="Toggle Chatbot"
      >
        <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? '×' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[320px] md:w-[400px] glass-dark rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden z-50 border border-white/10 flex flex-col h-[550px] animate-in slide-in-from-bottom-8 duration-500 ease-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950/80 to-blue-900/80 backdrop-blur-md text-white p-5 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold text-2xl shadow-lg animate-float">
                  G
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-blue-950 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">GRACE-X</h3>
                <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <p className="text-[10px] uppercase font-bold text-blue-200/80 tracking-widest">Sales Assistant Online</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-6 bg-blue-950/20 backdrop-blur-xl custom-scrollbar">
             {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-amber-500 text-slate-950 rounded-tr-none shadow-lg' 
                      : 'bg-white/10 text-white border border-white/10 rounded-tl-none backdrop-blur-md shadow-inner'
                  }`}>
                    {m.text}
                  </div>
                </div>
             ))}
             {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="bg-white/10 text-white border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 backdrop-blur-md shadow-inner">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-200/40 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-200/40 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-200/40 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
             )}
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-blue-950/40 backdrop-blur-2xl border-t border-white/5 flex gap-3 pb-6">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Tell me about your job..."
              className="flex-grow px-5 py-3 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-500/50 outline-none text-sm text-white placeholder:text-blue-200/40 transition-all font-medium"
            />
            <button 
              onClick={handleSend} 
              aria-label="Send Message" 
              className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center cursor-pointer shadow-lg hover:bg-amber-400 active:scale-90 transition-all text-xl"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
