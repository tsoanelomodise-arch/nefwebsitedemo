import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { NEF_FUNDS } from "../data/funds";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function FundChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hello! I'm your NEF Fund Assistant. How can I help you today? You can ask me about our different funds, eligibility criteria, or the application process."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const systemInstruction = `
        You are a helpful and professional AI assistant for the National Empowerment Fund (NEF) of South Africa.
        Your goal is to help users understand the various funds, products, and services offered by the NEF.
        
        Here is the information about NEF Funds:
        ${JSON.stringify(NEF_FUNDS, null, 2)}
        
        Guidelines:
        1. Be professional, polite, and encouraging.
        2. Provide accurate information based on the provided fund data.
        3. If a user asks about a specific fund, explain its objective, focus sectors, and criteria.
        4. If a user is unsure which fund is right, ask them about their business size, ownership, and industry to guide them.
        5. Encourage users to visit the "How to Apply" page for detailed application steps.
        6. Keep responses concise but informative.
        7. If you don't know the answer or it's not in the provided data, advise the user to contact the NEF directly.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          })),
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request. Please try again or contact NEF support.";
      setMessages(prev => [...prev, { role: "model", content: aiResponse }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: "model", content: "I encountered an error while processing your request. Please check your connection or try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-gold-foil text-black rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-widest animate-bounce">
          AI Help
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-[100] w-[400px] max-w-[calc(100vw-4rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="p-6 bg-black text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-foil rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">NEF Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 transition-colors rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user" ? "bg-black text-white" : "bg-gold-foil text-black"
                    }`}>
                      {msg.role === "user" ? <User size={14} /> : <Sparkles size={14} />}
                    </div>
                    <div className={`p-4 text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-black text-white rounded-2xl rounded-tr-none" 
                        : "bg-white text-black shadow-sm border border-gray-100 rounded-2xl rounded-tl-none"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gold-foil text-black flex items-center justify-center shrink-0">
                      <Loader2 size={14} className="animate-spin" />
                    </div>
                    <div className="p-4 bg-white text-black shadow-sm border border-gray-100 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <span className="text-xs font-medium italic opacity-50">Assistant is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about NEF funds..."
                  className="w-full pl-4 pr-12 py-4 bg-gray-100 border-none focus:ring-2 focus:ring-gold-foil text-sm font-medium"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white hover:bg-gold-foil hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest">
                Powered by NEF AI • Always verify critical info
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
