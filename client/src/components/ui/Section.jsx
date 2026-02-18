const Section = ({ title, subtitle, children }) => {
    return (
        <section className="py-12">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-600 mb-6">{subtitle}</p>
            )}

            {children}
        </section>
    );
}
export default Section;
