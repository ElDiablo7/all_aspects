'use client';

import { useState, useRef, useEffect } from 'react';
import { getSiteConfig } from '@/lib/site-config';
import { chat } from '@/app/actions/chat';
import { sendInquiry } from '@/app/actions/sendInquiry';

export default function GraceChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'agent'|'user', text: string}[]>([
    { role: 'agent', text: "Hi, I'm Grace. To give you the most accurate help, what kind of job do you need?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const config = getSiteConfig();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 1 && messages[0].role === 'agent') {
      speak(messages[0].text);
    }
  }, [isOpen, messages]);

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

  const handleSendInquiry = async () => {
    setIsTyping(true);
    try {
      const siteContext = config.domain.includes('paving') ? 'paving' : 'building';
      const response = await sendInquiry(messages, siteContext);
      if (response.success) {
        setMessages(prev => [...prev, { role: 'agent', text: response.message }]);
        speak(response.message);
      }
    } catch (error) {
      console.error('Send inquiry error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-GB';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    
    const attemptSpeech = () => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Extensive search for Google UK Female
      const targetVoice = 
        voices.find(v => v.name === 'Google UK English Female') || 
        voices.find(v => v.name.includes('Google') && v.name.includes('UK') && v.name.includes('Female')) ||
        voices.find(v => v.lang === 'en-GB' && v.name.includes('Female')) ||
        voices.find(v => v.lang === 'en-GB' && v.name.includes('Google')) ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'));
      
      if (targetVoice) {
        utterance.voice = targetVoice;
      }
      
      utterance.pitch = 1.16;
      utterance.rate = 1.12;
      utterance.lang = 'en-GB';
      
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        attemptSpeech();
        // Remove listener after first trigger to avoid multiple speakers
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      attemptSpeech();
    }
  };

  return (
    <>
      {/* Chat Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed z-[100] w-16 h-16 rounded-2xl glass-shiny depth-3d flex items-center justify-center transition-all duration-500 group border border-white/20 hover:scale-110 active:scale-95 animate-pulse-slow"
          style={{ bottom: '1.5rem', right: '1.5rem', left: 'auto' }}
          aria-label="Open Chat"
        >
          <div className="absolute inset-0 bg-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-3xl group-hover:scale-110 transition-transform">✨</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed z-[100] w-[calc(100%-2rem)] md:w-[400px] h-[600px] max-h-[85vh] glass-shiny depth-3d rounded-[32px] flex flex-col transition-all duration-500 border border-white/20 origin-bottom md:origin-bottom-right animate-in slide-in-from-bottom-8 scale-in-95"
          style={{ bottom: '1.5rem', right: '1.5rem', left: 'auto' }}
        >
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl glass-shiny border border-white/10 flex items-center justify-center shadow-lg group">
                <span className="text-2xl group-hover:rotate-12 transition-transform">👩‍💼</span>
              </div>
              <div>
                <h3 className="text-white font-bold leading-none mb-1">Grace</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] text-blue-200/50 uppercase font-black tracking-widest">AI Assistant</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
            >
              ✕
            </button>
          </div>

          {/* Message Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar scrolling-touch custom-scrollbar"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg border ${
                  m.role === 'user' 
                    ? 'bg-amber-500 text-slate-900 font-bold rounded-tr-none border-amber-400' 
                    : 'glass-dark text-blue-50 border-white/10 rounded-tl-none'
                }`}>
                  {m.role === 'agent' && <p className="mb-2 font-black text-[10px] uppercase tracking-tighter text-amber-500/50 italic">Grace Says:</p>}
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="glass-dark p-4 rounded-2xl rounded-tl-none border border-white/10">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening..." : "Tell me about your project..."}
                className="w-full bg-white/5 border border-white/10 text-white pl-5 pr-12 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner placeholder:text-blue-100/30 transition-all group-hover:bg-white/10"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:grayscale"
              >
                🚀
              </button>
            </div>
            <div className="flex items-center justify-between mt-4 px-1">
               <button 
                 onClick={toggleListening}
                 className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${isListening ? 'text-red-400' : 'text-blue-200/40 hover:text-amber-500'}`}
               >
                  <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-blue-200/20'}`}></span>
                  {isListening ? 'Stop Mic' : 'Voice Search'}
               </button>
               <button 
                 onClick={handleSendInquiry}
                 className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 hover:text-amber-500 transition-colors"
               >
                  Send Inquiry ⚡
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
