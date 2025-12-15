

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Coverage from "../../components/shared/Coverage";
import Reviews from "../Reviews/Reviews";
import hero from "../../assets/hero.svg"
import AffiliatePartner from "../../components/home/AffiliatePartner";
import FeaturedOn from "../../components/home/FeaturedOn";
import ConnectionSteps from "../../components/home/ConnectionSteps";

const Home = () => {
  const { data: tuitions = [] } = useQuery({
    queryKey: ["latest-tuitions"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuitions?limit=6&sort=latest`
      );
      return res.data.tuitions;
    },
  });


  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero min-h-screen bg-linear-to-br from-primary to-secondary text-white"
      >
        <div className="hero-content text-center flex-col md:flex-row gap-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Find Your Perfect Tutor in Minutes
            </h1>
            <p className="py-8 text-xl">
              Verified tutors • Transparent payment • Real-time communication
            </p>
            <div className="space-x-4">
              <Link to="/tuitions" className="btn btn-neutral btn-lg">
                Browse Tuitions
              </Link>
              <Link
                to="/signup?role=tutor"
                className="btn btn-outline btn-lg text-white hover:bg-cyan-800 hover:text-white"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
          <img src={hero} alt="Hero" />
        </div>
      </motion.section>


      {/* Latest Tuitions */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Latest Tuition Posts
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tuitions.map((tuition, i) => (
              <motion.div
                key={tuition._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body">
                  <h3 className="card-title text-primary">{tuition.subject}</h3>
                  <p>
                    <strong>Class:</strong> {tuition.class}
                  </p>
                  <p>
                    <strong>Location:</strong> {tuition.location}
                  </p>
                  <p>
                    <strong>Salary:</strong> ৳{tuition.budget}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/tuition/${tuition._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

<FeaturedOn/>
<AffiliatePartner/>
<ConnectionSteps/>


      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: 1,
                title: "Post Your Tuition",
                desc: "Tell us what you need",
              },
              {
                step: 2,
                title: "Tutors Apply",
                desc: "Qualified tutors contact you",
              },
              {
                step: 3,
                title: "Hire & Pay Securely",
                desc: "Pay only after hiring",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ scale: 1.05 }}
                className="bg-base-200 p-10 rounded-2xl"
              >
                <div className="text-6xl font-bold text-primary mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose eTuitionBD?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              "Verified Tutors",
              "Secure Payment",
              "24/7 Support",
              "100% Satisfaction",
            ].map((feature) => (
              <div key={feature} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl mb-4">✓</div>
                <h4 className="text-xl font-semibold">{feature}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews/>
      <Coverage/>
    </div>
  );
};

export default Home;
