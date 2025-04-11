import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section
        className="position-relative vh-100 bg-cover bg-center"
        style={{ backgroundImage: "url('https://example.com/your-hero-image.jpg')" }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative z-index-10 d-flex align-items-center justify-content-center text-center h-100 px-3 px-md-5">
          <div className="text-white max-w-xl">
            <h1 className="display-4 font-weight-bold mb-4">
              Transform Your Resume with AI
            </h1>
            <p className="lead mb-5">
              Get a professionally optimized resume to help you stand out in a competitive job market. Upload your resume today!
            </p>
            <Link
              to="/upload"
              className="btn btn-primary btn-lg px-4 py-2"
            >
              Upload Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center display-4 mb-5">Why Choose Our Service?</h2>
          <div className="row">
            <div className="col-12 col-md-4 text-center mb-4">
              <div className="bg-primary text-white p-4 rounded-circle mb-3">
                <i className="fas fa-rocket fa-3x"></i>
              </div>
              <h3 className="h4 font-weight-bold mb-3">AI-Powered Optimization</h3>
              <p className="text-muted">
                Our AI-powered tools analyze your resume and provide actionable feedback for improvement.
              </p>
            </div>
            <div className="col-12 col-md-4 text-center mb-4">
              <div className="bg-success text-white p-4 rounded-circle mb-3">
                <i className="fas fa-clipboard-list fa-3x"></i>
              </div>
              <h3 className="h4 font-weight-bold mb-3">Easy Resume Management</h3>
              <p className="text-muted">
                Manage all your resumes in one place. Upload, store, and edit your documents with ease.
              </p>
            </div>
            <div className="col-12 col-md-4 text-center mb-4">
              <div className="bg-purple text-white p-4 rounded-circle mb-3">
                <i className="fas fa-lock fa-3x"></i>
              </div>
              <h3 className="h4 font-weight-bold mb-3">Privacy and Security</h3>
              <p className="text-muted">
                We take your privacy seriously. All your data is securely stored and never shared without your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="display-4 mb-5">What Our Users Say</h2>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text italic mb-3">
                    "I uploaded my resume, and within minutes I received valuable feedback. My resume has never looked better!"
                  </p>
                  <h5 className="font-weight-bold">Jane Doe</h5>
                  <p className="text-muted">Software Developer</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text italic mb-3">
                    "The AI suggestions helped me identify key areas to improve. I landed my dream job thanks to this service!"
                  </p>
                  <h5 className="font-weight-bold">John Smith</h5>
                  <p className="text-muted">Data Analyst</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text italic mb-3">
                    "A game-changer for job seekers! This tool made my resume look professional and polished."
                  </p>
                  <h5 className="font-weight-bold">Mary Lee</h5>
                  <p className="text-muted">Marketing Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-primary text-white py-4">
        <div className="container d-flex justify-content-between align-items-center">
          <p>&copy; 2025 Resume Optimization Service</p>
          <div>
            <a href="/terms" className="text-white mr-4">Terms & Conditions</a>
            <a href="/privacy" className="text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
