import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
type ResumeFormData = {
  fullName: string;
  location: string;
  summary: string;
  skills: string;
  experience: {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
  }[];
  education: { id: string; school: string; degree: string; year: string }[];
};

function ResumeForm() {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm<ResumeFormData>({
    defaultValues: {
      fullName: user?.full_name || "",
      experience: [
        { id: uuidv4(), company: "", role: "", duration: "", description: "" },
      ],
      education: [{ id: uuidv4(), school: "", degree: "", year: "" }],
    },
  });

  const { fields: expFields, append: addExp } = useFieldArray({
    control,
    name: "experience",
  });
  const { fields: eduFields, append: addEdu } = useFieldArray({
    control,
    name: "education",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const url = import.meta.env.VITE_BASE_URL;

  const onSubmit = async (data: ResumeFormData) => {
    if (!user) {
      setStatusMessage("❌ You must be logged in to create a resume.");
      return;
    }

    const formattedText = `
    Full Name: ${data.fullName}
    Location: ${data.location}
    Summary: ${data.summary}
    Skills: ${data.skills}
    Experience:
${data.experience
  .map(
    (exp) =>
      `- ${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}`
  )
  .join("\n\n")}

Education:
${data.education
  .map((edu) => `- ${edu.degree}, ${edu.school} (${edu.year})`)
  .join("\n")}
    `.trim();

    try {
      const response = await fetch(`${url}/resumes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          original_text: formattedText,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage(
          `✅ Resume created successfully!`
        );
        reset();
      } else {
        setStatusMessage("❌ Failed to save resume.");
      }
    } catch (err) {
      console.error("Error saving resume:", err);
      setStatusMessage("❌ Error connecting to server.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="container mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="mb-4 text-primary fw-bold">
        Hello{" "}
        {user?.full_name
          ? `${user.full_name}, let's build your resume`
          : "Create Your Resume"}
      </h2>
  
      {statusMessage && (
        <div className="alert alert-info shadow-sm">{statusMessage}</div>
      )}
  
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          className="form-control rounded-3 shadow-sm"
          {...register("fullName")}
          defaultValue={user?.full_name || ""}
        />
      </div>
  
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          className="form-control rounded-3 shadow-sm"
          {...register("location")}
          required
          placeholder="e.g., New York, NY"
        />
      </div>
  
      <div className="mb-3">
        <label className="form-label">Professional Summary</label>
        <textarea
          className="form-control rounded-3 shadow-sm"
          {...register("summary")}
          rows={4}
          required
          placeholder="e.g., Full-stack developer with 3+ years of experience..."
        />
      </div>
  
      <div className="mb-3">
        <label className="form-label">Skills (comma separated)</label>
        <input
          className="form-control rounded-3 shadow-sm"
          {...register("skills")}
          required
          placeholder="e.g., JavaScript, React, PostgreSQL"
        />
      </div>
  
      <h4 className="mt-5 mb-3 text-secondary">Work Experience</h4>
      {expFields.map((field, index) => (
        <motion.div
          key={field.id}
          className="border p-3 mb-4 rounded-4 bg-light shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2">
            <label className="form-label">Company</label>
            <input
              className="form-control"
              {...register(`experience.${index}.company`)}
              placeholder="e.g., Google"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Role</label>
            <input
              className="form-control"
              {...register(`experience.${index}.role`)}
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Duration</label>
            <input
              className="form-control"
              {...register(`experience.${index}.duration`)}
              placeholder="e.g., Jan 2022 - Dec 2023"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              {...register(`experience.${index}.description`)}
              placeholder="Describe what you did..."
            />
          </div>
        </motion.div>
      ))}
  
      <button
        type="button"
        className="btn btn-outline-secondary mb-4 rounded-3"
        onClick={() =>
          addExp({
            id: uuidv4(),
            company: "",
            role: "",
            duration: "",
            description: "",
          })
        }
      >
        ➕ Add Experience
      </button>
  
      <h4 className="mt-5 mb-3 text-secondary">Education</h4>
      {eduFields.map((field, index) => (
        <motion.div
          key={field.id}
          className="border p-3 mb-4 rounded-4 bg-light shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2">
            <label className="form-label">School</label>
            <input
              className="form-control"
              {...register(`education.${index}.school`)}
              placeholder="e.g., NYU"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Degree</label>
            <input
              className="form-control"
              {...register(`education.${index}.degree`)}
              placeholder="e.g., B.S. in Computer Science"
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Year</label>
            <input
              className="form-control"
              {...register(`education.${index}.year`)}
              placeholder="e.g., 2024"
            />
          </div>
        </motion.div>
      ))}
  
      <button
        type="button"
        className="btn btn-outline-secondary mb-4 rounded-3"
        onClick={() =>
          addEdu({ id: uuidv4(), school: "", degree: "", year: "" })
        }
      >
        ➕ Add Education
      </button>
  
      <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
        <button type="submit" className="btn btn-primary px-4 py-2 rounded-3">
          💾 Create Resume
        </button>
        <Link to={`/resumeByUser/${user?.id}`}>
          <button type="button" className="btn btn-outline-primary px-4 py-2 rounded-3">
            📄 See Your Resume
          </button>
        </Link>
      </div>
    </motion.form>
  );
  
}

export default ResumeForm;
