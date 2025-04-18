import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section
  className="hero-section d-flex justify-content-center align-items-center text-white"
  style={{
    height: '100vh',
    backgroundImage: 'linear-gradient(to right, #1e3a8a, #2563eb)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="text-center px-3 px-md-5">
    <h1 className="display-3 fw-bold mb-4">Transform Your Resume with BatistAI</h1>
    <p className="lead mb-4 mx-auto" style={{ maxWidth: '720px' }}>
      Elevate your job search with our AI-powered resume optimization. Upload your resume and unlock professional feedback instantly.
    </p>
    <Link
      to="/upload"
      className="btn btn-lg px-4 py-3 shadow"
      style={{
        backgroundColor: '#ffffff',
        color: '#1e3a8a',
        fontWeight: '600',
        border: 'none',
      }}
    >
      Upload Your Resume
    </Link>
  </div>
</section>

      {/* Features Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="display-5 mb-5 text-dark">Why Choose Our Service?</h2>
          <div className="row">
            {[
              {
                icon: 'rocket',
                title: 'AI-Powered Optimization',
                desc: 'Receive smart feedback to improve your resume instantly.',
              },
              {
                icon: 'clipboard-list',
                title: 'Easy Resume Management',
                desc: 'Upload, store, and manage all your resumes effortlessly.',
              },
              {
                icon: 'lock',
                title: 'Privacy and Security',
                desc: 'Your information stays private and secure at all times.',
              },
            ].map((feature, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100 border-0 shadow-sm p-4">
                  <i className={`fas fa-${feature.icon} fa-3x text-primary mb-3`}></i>
                  <h5 className="fw-bold text-dark">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="display-5 mb-5 text-dark">What Our Users Say</h2>
          <div className="row">
            {[
              {
                quote:
                  "I uploaded my resume, and within minutes I received valuable feedback. My resume has never looked better!",
                name: 'Jane Doe',
                role: 'Software Developer',
              },
              {
                quote:
                  "The AI suggestions helped me identify key areas to improve. I landed my dream job thanks to this service!",
                name: 'John Smith',
                role: 'Data Analyst',
              },
              {
                quote:
                  "A game-changer for job seekers! This tool made my resume look professional and polished.",
                name: 'Mary Lee',
                role: 'Marketing Specialist',
              },
            ].map((testimonial, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card border-0 shadow-sm p-4 h-100">
                  <p className="fst-italic">"{testimonial.quote}"</p>
                  <h6 className="fw-bold mt-3">{testimonial.name}</h6>
                  <p className="text-muted">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <p className="mb-2 mb-md-0">&copy; 2025 Resume Optimization AI</p>
          <div>
            <a href="/terms" className="text-white me-4 text-decoration-none">
              Terms & Conditions
            </a>
            <a href="/privacy" className="text-white text-decoration-none">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
