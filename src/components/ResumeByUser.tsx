import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import html2pdf from "html2pdf.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Resume {
  id: number;
  user_id: number;
  original_text: string;
  optimized_text?: string;
  feedback?: {
    suggestions: string[];
  };
  created_at: string;
  isOptimizing?: boolean;
}

function ResumeByUser() {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeResumeId, setActiveResumeId] = useState<number | null>(null);
  const [template, setTemplate] = useState<"classic" | "modern">("classic");
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchResumeDataByUser = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`${url}/resumes/user/${user.id}`);
        const data = await res.json();

        if (data.success) {
          setResumes(data.payload);
        } else {
          setError("❌ Could not fetch resumes.");
        }
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError("❌ Internal error fetching resumes.");
      } finally {
        setLoading(false);
      }
    };
    fetchResumeDataByUser();
  }, [user?.id, url]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume? ❌"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${url}/resumes/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setResumes((prev) => prev.filter((resume) => resume.id !== id));
      } else {
        alert("Could not delete the resume");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const downloadResume = (resumeId: number) => {
    const element = document.getElementById(`resume-cv-content-${resumeId}`);
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: `resume-${resumeId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  const parseSections = (text: string) => {
    const sections = {
      summary: "",
      experience: "",
      education: "",
      skills: "",
    };

    const summaryMatch = text.match(
      /(?:Summary|Profile|Objective)\s*[:\-]?\s*([\s\S]*?)(?=(Experience|Education|Skills|$))/i
    );
    const experienceMatch = text.match(
      /Experience\s*[:\-]?\s*([\s\S]*?)(?=(Education|Skills|$))/i
    );
    const educationMatch = text.match(
      /Education\s*[:\-]?\s*([\s\S]*?)(?=(Skills|$))/i
    );
    const skillsMatch = text.match(/Skills\s*[:\-]?\s*([\s\S]*)/i);

    if (summaryMatch) sections.summary = summaryMatch[1].trim();
    if (experienceMatch) sections.experience = experienceMatch[1].trim();
    if (educationMatch) sections.education = educationMatch[1].trim();
    if (skillsMatch) sections.skills = skillsMatch[1].trim();

    return sections;
  };

  const optimizeResumeAI = async (resumeId: number) => {
    if (!user?.is_premium) {
      alert("Please become Premium to use this feature");
      navigate("/payments");
      return;
    }

    const resumeToOptimize = resumes.find((r) => r.id === resumeId);
    if (!resumeToOptimize) return;

    setResumes((prev) =>
      prev.map((resume) =>
        resume.id === resumeId ? { ...resume, isOptimizing: true } : resume
      )
    );

    try {
      const response = await axios.post(`${url}/resumes/${resumeId}/optimize`, {
        original_text: resumeToOptimize.original_text,
      });

      if (response.data.success) {
        setResumes((prev) =>
          prev.map((resume) =>
            resume.id === resumeId
              ? {
                  ...resume,
                  optimized_text: response.data.optimized_text,
                  feedback: response.data.feedback || {},
                  isOptimizing: false,
                }
              : resume
          )
        );
        setActiveResumeId(resumeId);
        alert("✅ Resume optimized and updated!");
      } else {
        alert("❌ Optimization failed.");
      }
    } catch (err) {
      console.error("Error optimizing resume:", err);
      alert("❌ Internal error optimizing resume.");
    } finally {
      setResumes((prev) =>
        prev.map((resume) =>
          resume.id === resumeId ? { ...resume, isOptimizing: false } : resume
        )
      );
    }
  };

  if (!user) return <p className="text-center mt-4">🔒 Please log in.</p>;
  if (loading) return <p className="text-center mt-4">⏳ Loading resume...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  return (
    <div className="container mt-5 p-4">
      <h2 className="text-center mb-4">📄 Your Resumes</h2>

      <div className="mb-4 text-center">
        <label className="me-2 fw-bold">Choose Template:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={template}
          onChange={(e) => setTemplate(e.target.value as "classic" | "modern")}
        >
          <option value="classic"> Classic</option>
          <option value="modern"> Modern</option>
        </select>
      </div>

      {resumes.map((resume) => {
        const isOptimizedView =
          activeResumeId === resume.id && resume.optimized_text;
        const text = isOptimizedView
          ? resume.optimized_text!
          : resume.original_text;
        const { summary, experience, education, skills } = parseSections(text);

        return (
          <div
            key={resume.id}
            id={`resume-cv-${resume.id}`}
            className="p-5 mb-5 shadow rounded"
            style={{
              fontFamily:
                template === "classic" ? "Georgia, serif" : "Arial, sans-serif",
              backgroundColor: template === "classic" ? "#fff" : "#f9f9f9",
              border: "1px solid #ddd",
              maxWidth: "8.5in",
              margin: "0 auto",
              color: "#333",
            }}
          >
            <div id={`resume-cv-content-${resume.id}`}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold text-primary">{user.full_name}</h2>
              </div>
              <hr />

              <section className="mb-4">
                <h5 className="text-secondary border-bottom pb-1">
                  📝 Summary
                </h5>
                <p>{summary || "No summary provided."}</p>
              </section>

              <section className="mb-4">
                <h5 className="text-secondary border-bottom pb-1">
                  💼 Experience
                </h5>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {experience || "No experience details available."}
                </pre>
              </section>

              <section className="mb-4">
                <h5 className="text-secondary border-bottom pb-1">
                  🎓 Education
                </h5>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {education || "No education details available."}
                </pre>
              </section>

              <section className="mb-4">
                <h5 className="text-secondary border-bottom pb-1">🛠 Skills</h5>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {skills || "No skills listed."}
                </pre>
              </section>

              <footer className="text-end text-muted">
                <small>
                  Created on: {new Date(resume.created_at).toLocaleDateString()}
                </small>
              </footer>
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={() => downloadResume(resume.id)}
              >
                📥 Download PDF
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(resume.id)}
              >
                🗑️ Delete Resume
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  activeResumeId === resume.id
                    ? setActiveResumeId(null)
                    : optimizeResumeAI(resume.id)
                }
              >
                {resume.isOptimizing ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : activeResumeId === resume.id ? (
                  "🔙 Back to Original"
                ) : (
                  "🤖 Optimize with AI"
                )}
              </button>
            </div>

            {/* FEEDBACK */}
            {resume.feedback?.suggestions && activeResumeId === resume.id && (
              <div className="feedback-section mt-4 p-4 bg-light rounded">
                <h5 className="text-primary">💬 BatistAI Feedback</h5>
                <ul>
                  {resume.feedback.suggestions.map((s, i) => (
                    <li key={i}>✅ {s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ResumeByUser;
