import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const navigate = useNavigate()
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
      
      setSuccess("User register successfully");
    
      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        is_premium: false,
      });
      navigate("/login")
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register</h2>

      {/* Mostramos mensaje de error o éxito si existen */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para nombre completo */}
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

        {/* Campo para email */}
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

        {/* Campo para contraseña */}
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

        {/* Campo para confirmar contraseña */}
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

        {/* Checkbox para seleccionar si quiere acceso premium */}
        <div className="form-check mb-3">
          {/* <input
          className="form-check-input"
          type="checkbox"
          name="is_premium"
          checked={formData.is_premium}
          onChange={handleChange}
          id="is_premium"
        />
        <label className="form-check-label" htmlFor="is_premium">
          I want premium access
        </label> */}
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}
export default Register;
