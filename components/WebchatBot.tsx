"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const CLIENT_ID = process.env.NEXT_PUBLIC_BOTPRESS_CLIENT_ID || "";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
}

const botKnowledge = [
  {
    keywords: ["مرحبا", "السلام", "هلا", "اهلا", "صباح", "مساء", "hello", "hi"],
    response: "أهلاً وسهلاً بك في حجزني! 👋 أنا المساعد الذكي للمنصة. كيف يمكنني مساعدتك في حجز فندقك المثالي؟",
  },
  {
    keywords: ["حجز", "احجز", "احجز لي", "أريد حجز", "كيف أحجز"],
    response: "للحجز:\n1. ابحث عن المدينة أو اسم الفندق\n2. اختر تواريخ الوصول والمغادرة\n3. حدد عدد الضيوف والغرف\n4. أكمل بياناتك واضغط «تأكيد الحجز»\n\nهل تريد مساعدة في خطوة معينة؟",
  },
  {
    keywords: ["سعر", "أسعار", "كم السعر", "تكلفة", "رخيص", "غالي"],
    response: "الأسعار تختلف حسب الفندق والموسم وعدد الليالي. يمكنك استخدام فلتر السعر في صفحة الفنادق لعرض النتائج ضمن ميزانيتك. هل لديك مدينة معينة أو ميزانية محددة؟",
  },
  {
    keywords: ["إلغاء", "الغاء", "ألغي", "استرجاع"],
    response: "يمكنك إلغاء أي حجز من صفحة «حجوزاتي» بالضغط على أيقونة الحذف بجانب الحجز. سياسات الإلغاء تختلف حسب الفندق.",
  },
  {
    keywords: ["فندق", "فنادق", "أين الفنادق", "قائمة"],
    response: "يمكنك الذهاب إلى صفحة «الفنادق» واستخدام البحث والفلاتر. هل تبحث عن مدينة معينة؟",
  },
  {
    keywords: ["دبي", "الرياض", "جدة", "القاهرة", "الدوحة", "مسقط", "المنامة", "أبوظبي"],
    response: "مدينة رائعة! استخدم شريط البحث في الصفحة الرئيسية أو صفحة الفنادق واكتب اسم المدينة، ثم اختر التواريخ لرؤية الخيارات المتاحة.",
  },
  {
    keywords: ["دعم", "مساعدة", "مشكلة", "خطأ", "لا يعمل"],
    response: "أنا هنا لمساعدتك! صف لي المشكلة بالتفصيل وسأحاول حلها. يمكنك أيضاً التواصل عبر البريد support@hajzni.com",
  },
  {
    keywords: ["شكر", "مشكور", "تسلم", "الله يعطيك"],
    response: "العفو! سعيد بمساعدتك 😊 إذا احتجت أي شيء آخر أنا هنا.",
  },
  {
    keywords: ["من أنت", "بوت", "ذكاء", "ai", "ذكاء اصطناعي"],
    response: "أنا المساعد الذكي لمنصة حجزني، مصمم لمساعدتك في البحث عن الفنادق وإتمام الحجوزات بسهولة. اسألني أي شيء متعلق بالحجز!",
  },
];

function getBotResponse(userMessage: string): string {
  const msg = userMessage.trim().toLowerCase();
  for (const item of botKnowledge) {
    if (item.keywords.some((k) => msg.includes(k.toLowerCase()))) {
      return item.response;
    }
  }
  return "شكراً لسؤالك! يمكنني مساعدتك في:\n• كيفية الحجز\n• البحث عن فنادق\n• الأسعار والإلغاء\n• أي استفسار عن المنصة\n\nاكتب سؤالك بشكل أوضح وسأجيبك فوراً.";
}

interface WebchatBotProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onClientReady?: (client: any) => void;
}

export default function WebchatBot({
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  onClientReady,
}: WebchatBotProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;
  const setIsOpen = controlledSetIsOpen || setInternalOpen;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "مرحباً! أنا مساعد حجزني الذكي 🤖\nكيف يمكنني مساعدتك اليوم؟",
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // تحميل Botpress إذا وُجد Client ID (اختياري)
  useEffect(() => {
    if (!CLIENT_ID) return;

    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script.async = true;
    script.onload = () => {
      const initScript = document.createElement("script");
      initScript.src = `https://files.bpcontent.cloud/${CLIENT_ID}/webchat/config.js`;
      initScript.async = true;
      document.body.appendChild(initScript);

      const check = setInterval(() => {
        if ((window as any).botpressWebChat || (window as any).botpress) {
          clearInterval(check);
          if (onClientReady) {
            onClientReady((window as any).botpressWebChat || (window as any).botpress);
          }
        }
      }, 300);
      setTimeout(() => clearInterval(check), 10000);
    };
    document.body.appendChild(script);
  }, [onClientReady]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        text: getBotResponse(userMsg.text),
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* الزر العائم - يظهر في كل الصفحات */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-gray-700 hover:bg-gray-800" : "bg-primary-600 hover:bg-primary-700"
        }`}
        aria-label="المساعد الذكي"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* نافذة الدردشة */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[9998] w-[340px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-primary-600 text-white px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">مساعد حجزني الذكي</h3>
              <p className="text-xs text-primary-100">متصل الآن</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "bot" ? "bg-primary-100" : "bg-gray-200"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4 text-primary-600" />
                  ) : (
                    <User className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "bot"
                      ? "bg-white text-gray-800 shadow-sm rounded-tr-sm"
                      : "bg-primary-600 text-white rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.role === "bot" ? "text-gray-400" : "text-primary-200"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-600" />
                </div>
                <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك هنا..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                dir="rtl"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
