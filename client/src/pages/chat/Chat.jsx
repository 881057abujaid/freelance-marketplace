import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import socket from "../../socket/socket";
import MessageBubble from "../../components/chat/MessageBubble";

const Chat = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const userId = user?.id;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    if (!orderId) return;

    const loadMessages = async () => {
      try {
        const res = await api.get(`/messages/${orderId}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadMessages();
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;

    socket.emit("joinRoom", orderId);

    const handleReceive = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [orderId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !userId) return;

    socket.emit("sendMessage", {
      orderId,
      text,
      sender: userId,
    });

    setText("");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 p-6 overflow-hidden">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg flex flex-col h-[75vh] overflow-hidden">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h1 className="font-semibold text-lg">Chat</h1>
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50"
          style={{ scrollbarWidth: "none" }}
        >
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              mine={
                msg.sender === userId ||
                msg.sender?._id === userId
              }
            />
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type message..."
              className="flex-1 border border-slate-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              className="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Chat;
