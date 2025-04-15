import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  is_premium: boolean;
}
function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_premium: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checked" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Password do not match");
      return;
    }

    try {
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          is_premium: formData.is_premium,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      setSuccess("User register successfully Redirecting to Login page");

      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_premium: false,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register</h2>


      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}


      <form onSubmit={handleSubmit}>
   
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>


        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

 
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control"
            minLength={6}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-control"
            minLength={6}
          />
        </div>

      
  
   
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        
      </form>
    </div>
  );
}
export default Register;
