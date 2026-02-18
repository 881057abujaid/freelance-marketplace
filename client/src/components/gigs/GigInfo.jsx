const GigInfo = ({ gig }) => {
    return (
        <>
            <h1 className="text-2xl font-semibold text-slate-800 mt-4">
                {gig.title}
            </h1>

            <p className="mt-3 text-gray-600">
                {gig.description}
            </p>

            {gig.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {gig.tags.map((t, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-slate-100 text-sm rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};

export default GigInfo;
