const StatCard = ({ title, value, icon, highlight }) => {
    return (
        <div
            className={`
                bg-white
                p-6
                rounded-xl
                border
                shadow-sm
                text-center
                hover:shadow-md
                transition
                ${highlight ? "border-primary" : "border-slate-100"}
            `}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{icon}</div>
                <div className="text-sm text-gray-500">{title}</div>
            </div>

            <div
                className={`
                    text-3xl font-bold
                    ${highlight ? "text-primary" : "text-slate-800"}
                `}
            >
                {value}
            </div>
        </div>
    );
};

export default StatCard;