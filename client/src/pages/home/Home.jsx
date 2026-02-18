import Hero from "../../components/common/Hero";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import { Link } from "react-router-dom";
import FeaturedGigs from "../../components/gigs/FeaturedGigs";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import logo from "../../assets/logo-design.png";
import seo from "../../assets/seo.png";
import content from "../../assets/content-writing.png";
import app from "../../assets/mobile-apps.png";
import web from "../../assets/web-development.png";
import vidEdit from "../../assets/video-editing.png";

const categories = [
  { title: "Logo Design", src: logo },
  { title: "Web Development", src: web },
  { title: "SEO", src: seo },
  { title: "Content Writing", src: content },
  { title: "Mobile Apps", src: app },
  { title: "Video Editing", src: vidEdit },
];

const Home = () => {
  return (
    <>
      <Hero />

      {/* Categories */}
      <Container>
        <Section
          title="Popular Categories"
          subtitle="Browse services by category"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="overflow-hidden bg-white rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition text-center cursor-pointer"
              >
                <img src={cat.src} />
              </div>
            ))}
          </div>
        </Section>
      </Container>

      <Container>
        <Section
          title="Featured Services"
          subtitle="Hand-picked top rated gigs"
        >
          <FeaturedGigs />
        </Section>
      </Container>


      <div className="bg-slate-50 py-16 mt-16">
        <Container>
          <Section
            title="Why Choose Freelance?"
            subtitle="Built for professionals and businesses"
          >
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-semibold text-lg mb-2">
                  Secure Payments
                </h3>
                <p className="text-gray-600 text-sm">
                  Payments are protected until work is delivered.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold text-lg mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  Get quality work delivered on time.
                </p>
              </div>

              <div>
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="font-semibold text-lg mb-2">
                  Top Rated Sellers
                </h3>
                <p className="text-gray-600 text-sm">
                  Work with trusted freelancers.
                </p>
              </div>
            </div>
          </Section>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">
                <AnimatedCounter target={10000} />+
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Freelancers
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                <AnimatedCounter target={50000} />+
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Completed Orders
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                <AnimatedCounter target={4.8} />★</div>
              <div className="text-sm text-gray-500 mt-1">
                Average Rating
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                <AnimatedCounter target={99} />%
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/80 mb-6">
              Join thousands of businesses hiring top freelancers.
            </p>

            <Link
              to="/gigs"
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Explore Services
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
