const StarRating = ({ rating = 0, count = 0, size = 16 }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[1,2,3,4,5].map(num => (
        <span
          key={num}
          style={{ fontSize: size }}
          className={num <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 ml-1">
        {rating > 0 ? rating : "New"} {count > 0 && `(${count})`}
      </span>
    </div>
  );
};
export default StarRating;