import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle, FaEdit, FaTrophy } from "react-icons/fa";
import ResumeByUser from "../components/ResumeByUser";

interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  is_premium: boolean;
  created_at: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();

        if (data.success) {
          setUser(data.payload);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user", err);
        setError("Something went wrong while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, apiUrl]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4 w-1/3 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center mt-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center">
        <div
          className="card shadow-lg border-0 p-4 w-100"
          style={{ maxWidth: "800px" }}
        >
          <div className="text-center mb-4">
            <FaUserCircle size={120} className="text-secondary mb-3" />
            <h2 className="fw-semibold">{user?.full_name}</h2>
            <div className="my-2">
              {user?.is_premium ? (
                <span className="badge bg-success fs-6 px-3 py-2">
                  🌟 Premium Member
                </span>
              ) : (
                <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                  🔓 Basic Member
                </span>
              )}
            </div>
          </div>

          <hr />

          <div className="mb-3">
            <p className="mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="mb-0">
              <strong>Account Created:</strong> Created on:{" "}
              {user
                ? new Date(user.created_at).toLocaleDateString()
                : "Loading..."}
            </p>
          </div>

          <hr />

          <div className="d-flex flex-wrap gap-3 justify-content-center">
         
            {!user?.is_premium && (
              <Link to="/payments">
                <button className="btn btn-warning text-dark d-flex align-items-center px-4">
                  <FaTrophy className="me-2" /> Upgrade to Premium
                </button>
              </Link>
            )}
            <Link
              to="/createResume"
              className="btn btn-success d-flex align-items-center px-4 fw-bold"
            >
              ✍️ Create Your Resume
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <ResumeByUser />
      </div>
    </div>
  );
};

export default UserProfile;
