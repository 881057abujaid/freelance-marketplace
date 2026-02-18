import { Link } from "react-router-dom";

const FooterColumn = ({ title, links = [] }) => {
    return (
        <div>
            <h5 className="font-semibold text-slate-800 mb-3">
                {title}
            </h5>

            <ul className="space-y-2 text-sm text-gray-600">
                {links.map((l, i) => (
                    <li key={i}>
                        {l.to ? (
                            <Link to={l.to} className="hover:text-primary transition">
                                {l.label}
                            </Link>
                        ) : (
                            <a href={l.href} className="hover:text-primary transition">
                                {l.label}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterColumn;
