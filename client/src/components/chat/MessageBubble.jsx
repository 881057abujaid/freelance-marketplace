const MessageBubble = ({ message, mine }) => {
  const time = new Date(message.createdAt);

  const shortTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const fullTime = time.toLocaleString();

  const avatar =
    message.sender?.avatar
      ? `http://127.0.0.1:5000${message.sender.avatar}`
      : "/avatar.png";

  return (
    <div className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      
      {!mine && (
        <img src={avatar} className="w-8 h-8 rounded-full object-cover" />
      )}

      <div className="flex flex-col max-w-xs md:max-w-md">
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm text-sm transition-all duration-200 ${
            mine
              ? "bg-primary text-white rounded-br-none"
              : "bg-white text-slate-800 rounded-bl-none"
          }`}
        >
          {message.text}
        </div>

        <span
          className={`text-[11px] mt-1 ${
            mine ? "text-right text-gray-300" : "text-gray-400"
          }`}
          title={fullTime}
        >
          {shortTime}
        </span>
      </div>

      {mine && (
        <img src={avatar} className="w-8 h-8 rounded-full object-cover" />
      )}
    </div>
  );
};

export default MessageBubble;
