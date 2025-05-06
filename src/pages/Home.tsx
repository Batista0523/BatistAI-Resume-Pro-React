import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
  };

  const cardHover = {
    hover: { scale: 1.05, boxShadow: "0 15px 40px rgba(0,0,0,0.2)" },
  };

  return (
    <div className="bg-light text-dark">
      {/* Hero Section with Animated Background */}
      <section
        className="d-flex justify-content-center align-items-center text-white text-center position-relative"
        style={{
          height: "100vh",
          background: "linear-gradient(to right, #1e3a8a, #2563eb)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
          animation: "gradient 10s ease infinite alternate", // Subtle animation on background gradient
          overflow: "hidden",
        }}
      >
        <motion.div
          className="container px-3 px-md-5"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h1
            className="display-2 fw-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            Transform Your Resume with <span className="text-warning">BatistAI</span>
          </motion.h1>
          <motion.p
            className="lead mb-5 mx-auto"
            style={{ maxWidth: "720px" }}
            variants={fadeUp}
          >
            AI-powered resume enhancement that helps you stand out. Modern, fast, and stunningly effective.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to={isAuthenticated ? "/createResume" : "/register"}
              className="btn btn-lg btn-light text-primary fw-semibold shadow px-5 py-3"
            >
              {isAuthenticated ? "Create Resume" : "Get Started"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section with Hover Effects */}
      <section className="py-5 bg-white text-center">
        <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="display-5 fw-bold mb-5 text-primary">Why Choose Our Service?</h2>
          <div className="row">
            {[
              {
                icon: "rocket",
                title: "AI-Powered Optimization",
                desc: "Receive smart feedback to improve your resume instantly.",
              },
              {
                icon: "clipboard-list",
                title: "Easy Resume Management",
                desc: "Upload, store, and manage all your resumes effortlessly.",
              },
              {
                icon: "lock",
                title: "Privacy and Security",
                desc: "Your information stays private and secure at all times.",
              },
            ].map((feature, idx) => (
              <motion.div
                className="col-md-4 mb-4"
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.2 }}
              >
                <motion.div
                  className="card h-100 border-0 shadow-lg p-4 bg-light"
                  whileHover={cardHover}
                >
                  <i className={`fas fa-${feature.icon} fa-3x text-primary mb-3`} style={{ transition: "transform 0.3s" }}></i>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section with Dynamic Cards */}
      <section className="py-5 bg-light text-center">
        <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="display-5 fw-bold mb-5 text-primary">What Our Users Say</h2>
          <div className="row">
            {[
              {
                quote: "I uploaded my resume, and within minutes I received valuable feedback. My resume has never looked better!",
                name: "Jane Doe",
                role: "Software Developer",
              },
              {
                quote: "The AI suggestions helped me identify key areas to improve. I landed my dream job thanks to this service!",
                name: "John Smith",
                role: "Data Analyst",
              },
              {
                quote: "A game-changer for job seekers! This tool made my resume look professional and polished.",
                name: "Mary Lee",
                role: "Marketing Specialist",
              },
            ].map((testimonial, idx) => (
              <motion.div
                className="col-md-4 mb-4"
                key={idx}
                variants={fadeUp}
                transition={{ delay: idx * 0.3 }}
              >
                <div className="card border-0 shadow-sm p-4 h-100 bg-light hover-shadow">
                  <p className="fst-italic text-muted">"{testimonial.quote}"</p>
                  <h6 className="fw-bold mt-3">{testimonial.name}</h6>
                  <p className="text-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action with Background Animation */}
      <section className="py-5 bg-primary text-center text-white" style={{ position: "relative" }}>
        <div className="background-animation"></div>
        <motion.div
          className="container"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h2 className="display-4 fw-bold mb-4">Ready to Boost Your Career?</h2>
          <p className="lead mb-4">
            Join thousands of job seekers who have enhanced their resumes with BatistAI. Get noticed and land your dream job faster.
          </p>
          <Link
            to={isAuthenticated ? "/createResume" : "/register"}
            className="btn btn-lg btn-light text-primary fw-semibold shadow px-5 py-3"
          >
            {isAuthenticated ? "Create Resume" : "Get Started"}
          </Link>
        </motion.div>
      </section>

      {/* Footer with Social Links */}
      <footer className="bg-dark text-white py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <p className="mb-2 mb-md-0">&copy; 2025 Resume BatistAI</p>
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a href="#" className="text-white text-decoration-none">Privacy</a>
            </li>
            <li className="list-inline-item mx-3">|</li>
            <li className="list-inline-item">
              <a href="#" className="text-white text-decoration-none">Terms</a>
            </li>
            <li className="list-inline-item mx-3">|</li>
            <li className="list-inline-item">
              <a href="#" className="text-white text-decoration-none">Follow Us</a>
            </li>
          </ul>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% {
            background: linear-gradient(to right, #3b82f6, #9333ea);
          }
          50% {
            background: linear-gradient(to right, #9333ea, #3b82f6);
          }
          100% {
            background: linear-gradient(to right, #9333ea, #10b981);
          }
        }

        .hover-shadow:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transform: translateY(-10px);
        }

        .background-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://source.unsplash.com/random/1920x1080?business') no-repeat center center;
          background-size: cover;
          filter: blur(8px);
          z-index: -1;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

export default Home;
