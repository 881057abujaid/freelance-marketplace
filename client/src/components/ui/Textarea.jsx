const Textarea = (props) => {
    return (
        <textarea
            {...props}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
        />
    );
}
export default Textarea;