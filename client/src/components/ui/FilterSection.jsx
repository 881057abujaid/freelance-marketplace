const FilterSection = ({ label, children }) => {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-600">{label}</label>
            {children}
        </div>
    );
}
export default FilterSection;