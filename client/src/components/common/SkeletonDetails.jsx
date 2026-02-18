const SkeletonDetails = () => {
    return (
        <div className="p-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="h-80 bg-slate-200 rounded" />
                    <div className="h-6 bg-slate-200 rounded mt-4 w-3/4" />
                    <div className="h-4 bg-slate-200 rounded mt-3 w-full" />
                </div>

                <aside className="bg-white rounded-lg shadow-sm p-5 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-1/2" />
                    <div className="h-10 bg-slate-200 rounded mt-4" />
                    <div className="h-4 bg-slate-200 rounded mt-4 w-3/4" />
                </aside>
            </div>
        </div>
    )
}

export default SkeletonDetails;
