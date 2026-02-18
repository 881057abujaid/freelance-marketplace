const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition ${className}`}>
            {children}
        </div>
    );
}
export default Card;