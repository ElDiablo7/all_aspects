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

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

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
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-blue-950/20 backdrop-blur-xl custom-scrollbar">
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

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-blue-950/30 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
            {[
              "What area do you cover?",
              "How do I get a quote?",
              "What services do you offer?",
              "Are you available now?"
            ].map((p, i) => (
              <button 
                key={i} 
                onClick={() => { setInput(p); setTimeout(handleSend, 100); }}
                className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] text-blue-100 hover:bg-white/20 hover:text-white transition-all cursor-pointer shadow-sm"
              >
                {p}
              </button>
            ))}
            <button 
              onClick={handleSendInquiry}
              className="flex-shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] text-amber-400 font-bold hover:bg-amber-500/40 transition-all cursor-pointer shadow-lg"
            >
              📧 Send to Team
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-blue-950/40 backdrop-blur-2xl border-t border-white/5 flex gap-2 pb-6">
            <button 
              onClick={toggleListening}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white/5 text-blue-200 hover:bg-white/10'
              } border border-white/10 cursor-pointer`}
              title="Speak to Grace"
            >
              {isListening ? '⏺' : '🎤'}
            </button>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Tell me about your job..."}
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
