import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Wand2 } from "lucide-react";
import { Button } from "../components";
// import axios from "axios"; // For API integration
import conf from "../conf/conf";
import { GoogleGenerativeAI } from "@google/generative-ai";



const predefinedResponses = {
  "hello": "Hi there! Welcome to Blogsphere. How can I assist you today? 😊",
  "help": "I can help with:\n1. Account issues\n2. Creating and managing blog posts\n3. Profile settings\n4. Login/Signup\n5. General information about Blogsphere",
  
  // Account related questions
  "how to signup": "To sign up, click the 'Sign Up' button and enter your details. You will receive a verification email to complete the registration.",
  "how to login": "Once you're signed up, click 'Login', enter your credentials, and you'll be able to access all features.",
  "forgot password": "If you forgot your password, you can reset it by clicking the 'Forgot Password' link on the login page.",
  
  // Post management questions
  "how to create a post": "To create a post, go to the 'Create Post' page, enter the title, description, and an image. Set the post to 'Active' to make it visible.",
  "how to edit a post": "To edit a post, go to the 'My Posts' section, click on the post you want to edit, and update the details.",
  "how to delete a post": "Currently, you can only deactivate your post. We do not have a delete feature, but deactivating will hide it from the public view.",
  
  // Profile related questions
  "how to edit my profile": "To edit your profile, go to your profile page and click on 'Edit Profile'. You can change your name, username, bio, and social handles.",
  "how to see my posts": "To see your posts, go to the 'My Posts' section where you can view all your active and inactive posts.",
  
  // General website and feature questions
  "what is Blogsphere": "Blogsphere is a platform where you can share your thoughts and knowledge by creating blog posts. You can also comment on and like posts from other users.",
  "can I read blogs without signing up": "Yes, you can read blogs without signing up, but to like or comment, you need to create an account.",
  "how to contact support": "If you're experiencing issues, feel free to reach out to me, Himanshu Sharma, on GitHub. Here's the link to my profile: [GitHub](https://github.com/himanshu7437).",
  "site issues": "If you're facing any issues, try refreshing the page a couple of times. If problems persist, please report them on my GitHub page.",
  
  // Errors and loading issues
  "site is not loading": "If you're facing a loading issue, please refresh the page 2-3 times. If the issue persists, contact support on GitHub.",
  
  // Miscellaneous
  "thank you": "You're welcome! If you need any more help, feel free to ask.",
  "default": "I'm still learning! For immediate help, feel free to email me or visit my [GitHub](https://github.com/himanshu7437).",
};

const contextBrief = `
You are BlogSphere's support assistant 🤖✨. 
Always answer ONLY based on the following information:

📌 About BlogSphere:
- BlogSphere 📝 is a modern, sleek blogging platform built with React.js (frontend) and Appwrite (backend).
- It allows users to create, edit, deactivate, like, and comment on blog posts. 
- Posts can be permanently deleted; they can also be deactivated.
- BlogSphere includes user profiles, likes, and a comments system. 
- The UI is fully responsive across all devices.

👥 User Roles:
- Guests (not logged in): Can ONLY view blog posts. They cannot like, comment, or create posts.
- Logged-in users: Can sign up, log in, edit profiles, create/edit/deactivate posts, like posts, and add/edit/delete comments.

⚡ Tech Stack:
- Frontend: React.js, Redux, Tailwind CSS, React Router, React Icons.
- Backend (Appwrite Services): Authentication, Database (posts, comments, likes, user profiles), Storage (images), Appwrite Functions.

🛠️ Common Issues:
- If the site does not work properly, users should refresh the page or contact support via GitHub: https://github.com/himanshu7437.

💬 Guidelines for Responses:
1. Answer questions strictly based on BlogSphere only.
2. If asked unrelated questions (math, history, geography, general knowledge, etc.), politely reply: 
   👉 "I'm still learning! For immediate help, feel free to email me or visit my [GitHub](https://github.com/himanshu7437)."
3. If the user greets you (like "hello", "how are you"), respond politely and briefly, then offer BlogSphere-related help. 
   Example: "Hi there! 👋 I'm doing great, thanks for asking. How can I assist you with BlogSphere today?"

Stick to this context at all times.
`;



const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });


export default function Chatbot() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // AI Response Simulation

const getResponse = async (query) => {
  setIsTyping(true);
  try {
    const cleanQuery = query.toLowerCase();

    // Step 1: Try predefined FAQ
    const predefined = 
      predefinedResponses[cleanQuery] || 
      Object.entries(predefinedResponses).find(([key]) =>
        cleanQuery.includes(key)
      )?.[1];

    if (predefined) return predefined;

    // Step 2: Ask Gemini with context
          const result = await model.generateContent([
      `${contextBrief}\n\nUser question: ${query}`
    ]);

    return result.response.text();

  } catch (error) {
    // console.error("Gemini API error:", error);
    return "⚠️ Sorry, I couldn’t get an answer right now. Please try again later.";
  } finally {
    setIsTyping(false);
  }
};


  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    const response = await getResponse(input);
    const botMessage = { text: response, sender: "bot", timestamp: new Date() };
    
    setMessages(prev => [...prev, botMessage]);
    setInput("");
    inputRef.current.focus();
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {isOpen ? (
        <div className="transition-all transform bg-white border border-gray-100 shadow-xl rounded-2xl w-96">
          <div className="p-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot size={24} />
                <h2 className="text-lg font-semibold">Help Assistant</h2>
              </div>
              <X 
                className="transition-opacity cursor-pointer hover:opacity-80" 
                onClick={() => setIsOpen(false)}
              />
            </div>
          </div>

          <div className="flex flex-col h-96">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100"
                  }`}>
                    <div className="text-sm">{msg.text}</div>
                    <div className="mt-1 text-xs opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Wand2 className="animate-pulse" size={16} />
                  <div className="text-sm">Assistant is typing...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  onClick={handleSend}
                  className="p-2 transition-colors rounded-full aspect-square hover:bg-blue-600"
                  disabled={isTyping}
                >
                  <Send size={20} />
                </Button>
              </div>
              <div className="mt-2 text-xs text-center text-gray-500">
                Powered by AI • Privacy focused
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="p-4 transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <MessageCircle size={24} />
          {/* {messages.length > 0 && (
            <div className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
              {messages.length} // we can use it unable total message 
            </div>
          )} */}
        </Button>
      )}
    </div>
  );
}
