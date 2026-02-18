const Select = ({ children, ...props }) => {
    return (
        <select
            {...props}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
        >
            {children}
        </select>
    );
}
export default Select;