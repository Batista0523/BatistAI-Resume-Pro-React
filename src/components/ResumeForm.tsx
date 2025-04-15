import { useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; 

type ResumeFormData = {
  fullName: string;
  location: string;
  summary: string;
  skills: string;
  experience: { id: string; company: string; role: string; duration: string; description: string }[];
  education: { id: string; school: string; degree: string; year: string }[];
};

function ResumeForm() {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm<ResumeFormData>({
    defaultValues: {
      experience: [{ id: uuidv4(), company: "", role: "", duration: "", description: "" }],
      education: [{ id: uuidv4(), school: "", degree: "", year: "" }],
    },
  });

  const { fields: expFields, append: addExp } = useFieldArray({ control, name: "experience" });
  const { fields: eduFields, append: addEdu } = useFieldArray({ control, name: "education" });

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
${data.experience.map(exp => `- ${exp.role} at ${exp.company} (${exp.duration})\n${exp.description}`).join("\n\n")}

Education:
${data.education.map(edu => `- ${edu.degree}, ${edu.school} (${edu.year})`).join("\n")}
    `.trim();

    try {
      const response = await fetch(`${url}/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          original_text: formattedText,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage("✅ Resume saved successfully!");
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
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
      <h2 className="mb-4">📝 Create Your Resume</h2>

      {statusMessage && <div className="alert alert-info">{statusMessage}</div>}

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input className="form-control" {...register("fullName")} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input className="form-control" {...register("location")} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Professional Summary</label>
        <textarea className="form-control" {...register("summary")} rows={4} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Skills (comma separated)</label>
        <input className="form-control" {...register("skills")} required />
      </div>

      <h4 className="mt-4">Work Experience</h4>
      {expFields.map((field, index) => (
        <div key={field.id} className="border p-3 mb-3 rounded">
          <div className="mb-2">
            <label className="form-label">Company</label>
            <input className="form-control" {...register(`experience.${index}.company`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Role</label>
            <input className="form-control" {...register(`experience.${index}.role`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Duration</label>
            <input className="form-control" {...register(`experience.${index}.duration`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows={3} {...register(`experience.${index}.description`)} />
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-outline-secondary mb-3" onClick={() => addExp({ id: uuidv4(), company: "", role: "", duration: "", description: "" })}>
        ➕ Add Experience
      </button>

      <h4 className="mt-4">Education</h4>
      {eduFields.map((field, index) => (
        <div key={field.id} className="border p-3 mb-3 rounded">
          <div className="mb-2">
            <label className="form-label">School</label>
            <input className="form-control" {...register(`education.${index}.school`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Degree</label>
            <input className="form-control" {...register(`education.${index}.degree`)} />
          </div>
          <div className="mb-2">
            <label className="form-label">Year</label>
            <input className="form-control" {...register(`education.${index}.year`)} />
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-outline-secondary mb-4" onClick={() => addEdu({ id: uuidv4(), school: "", degree: "", year: "" })}>
        ➕ Add Education
      </button>

      <button type="submit" className="btn btn-primary w-100">💾 Save Resume</button>
    </form>
  );
}

export default ResumeForm;
