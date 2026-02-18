const AppCard = ({ children, className = "" }) => {
  return (
    <div className={`
      bg-white
      rounded-xl
      shadow-sm
      border border-slate-100
      p-5
      transition-all
      hover:shadow-md
      ${className}
    `}>
      {children}
    </div>
  );
};

export default AppCard;
