const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`
        px-4 py-2
        rounded-lg
        bg-primary
        text-white
        font-medium
        shadow-sm
        transition-all
        duration-200
        hover:shadow-md
        hover:scale-[1.02]
        active:scale-95
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
