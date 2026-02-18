const SkeletonGig = () => {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-3 animate-pulse">
            <div className="h-40 w-full bg-slate-200 rounded" />
            <div className="h-4 bg-slate-200 rounded mt-3 w-3/4" />
            <div className="h-3 bg-slate-200 rounded mt-2 w-5/6" />
            <div className="mt-3 flex items-center justify-between">
                <div className="h-8 w-32 bg-slate-200 rounded" />
                <div className="h-6 w-16 bg-slate-200 rounded" />
            </div>
        </div>
    )
}

export default SkeletonGig;
