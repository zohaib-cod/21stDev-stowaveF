'use client';
import { useState, useEffect, useRef } from 'react';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Auto-scroll ke liye ref layer
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('ecom_chat_history');
    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const saveToCache = (updatedMessages) => {
    setMessages(updatedMessages);
    localStorage.setItem('ecom_chat_history', JSON.stringify(updatedMessages));
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user', text: input };
    const newMessagesWithUser = [...messages, userMsg];
    saveToCache(newMessagesWithUser);
    
    setInput('');
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages 
        }),
      });
      
      const data = await res.json();
      
      if (data.reply) {
        const aiMsg = { role: 'model', text: data.reply };
        saveToCache([...newMessagesWithUser, aiMsg]);
      } else if (data.error) {
        console.error("Backend Error Response:", data.error);
      }
    } catch (err) {
      console.error("Chat Connection Error to Backend:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open shopping assistant"
        className="fixed bottom-5 right-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white pl-3 pr-4 py-3 rounded-xl shadow-2xl z-50 transition-transform hover:scale-105"
      >
        <span className="relative flex items-center justify-center w-7 h-7 bg-white/15 rounded-lg shrink-0">
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full"></span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M4 4h16v11H7l-3 3V4z" />
            <path d="M8 9h8M8 12h5" />
          </svg>
        </span>
        <span className="text-sm font-medium">Shopping Assistant</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 z-50 text-black">
      {/* Chat Header */}
      <div className="flex justify-between items-center mb-3 pb-2 border-b">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          <h3 className="font-bold text-sm text-blue-600">Shopping Assistant</h3>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { localStorage.removeItem('ecom_chat_history'); setMessages([]); }}
            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear Chat
          </button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="h-64 overflow-y-auto mb-4 p-2 space-y-2 bg-gray-50 rounded-lg scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg text-xs max-w-[80%] break-words ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-2 rounded-lg text-xs text-gray-500 italic animate-pulse">
              typing...
            </div>
          </div>
        )}

        {/* Dummy div for auto-scrolling execution */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Field */}
      <div className="flex gap-2">
        <input 
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="border border-gray-300 p-2 w-full rounded-lg text-xs bg-white text-black focus:outline-none focus:border-blue-500 placeholder-gray-400" 
          placeholder="Ask about products, delivery..."
        />
        <button 
          onClick={sendMessage} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}