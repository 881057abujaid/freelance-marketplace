import FooterColumn from "./FooterColumn";
import NewsLetter from "./NewsLetter";
import SocialIcons from "./socialIcons";
import { Link } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-16 bg-gradient-to-b from-white to-slate-50 border-t">

            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div>
                    <h3 className="text-2xl font-bold text-primary">
                        Freelance
                    </h3>

                    <p className="text-sm text-gray-600 mt-3">
                        Hire top freelancers. Secure payments, fast delivery,
                        and trusted professionals worldwide.
                    </p>

                    <div className="mt-4">
                        <SocialIcons />
                    </div>
                </div>

                {/* Columns */}
                <FooterColumn
                    title="Explore"
                    links={[
                        { label: "Browse Services", to: "/gigs" },
                        { label: "Become a Seller", to: "/create-gig" },
                        { label: "Orders", to: "/orders" }
                    ]}
                />

                <FooterColumn
                    title="Resources"
                    links={[
                        { label: "Help Center", href: "#" },
                        { label: "Terms", href: "#" },
                        { label: "Privacy", href: "#" }
                    ]}
                />

                {/* Newsletter */}
                <div>
                    <h5 className="font-semibold text-slate-800 mb-3">
                        Stay Updated
                    </h5>

                    <NewsLetter />
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-500">

                    <span>© {year} Freelance. All rights reserved.</span>

                    <span>
                        Built with ❤️ •{" "}
                        <Link to="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
