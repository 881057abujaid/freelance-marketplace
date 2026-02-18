const Toast = ({ toast, onClose }) => {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`
        ${colors[toast.type]}
        text-white px-5 py-3 rounded-lg shadow-lg
        flex items-center justify-between gap-4
        animate-slideIn
      `}
    >
      <span className="text-sm font-medium">
        {toast.message}
      </span>

      <button
        onClick={onClose}
        className="text-white/80 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
