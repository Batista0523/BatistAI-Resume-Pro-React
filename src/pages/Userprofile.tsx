import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle, FaEdit, FaTrophy } from "react-icons/fa";

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
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card shadow p-4" style={{ width: "80%" }}>
          <div className="text-center">
            <div className="mb-3">
          
              <FaUserCircle size={150} className="text-muted" />
            </div>
            <h2 className="mb-3">{user?.full_name}</h2>
           
           

            <div className="mb-4">
              {user?.is_premium ? (
                <span className="badge bg-success">Premium Member</span>
              ) : (
                <span className="badge bg-warning">Basic Member</span>
              )}
            </div>

            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Account Created:</strong> {user?.created_at}</p>

            <div className="mt-4 d-flex justify-content-between">
              <Link to="/edit-profile" className="btn btn-primary d-flex align-items-center">
                <FaEdit className="me-2" /> Edit Profile
              </Link>
              {!user?.is_premium && (
                <button className="btn btn-danger d-flex align-items-center">
                  <FaTrophy className="me-2" /> Upgrade to Premium
                </button>
              )}
            </div>
            <Link to='/creatResume' >Create Your Resume</Link>
            <br />
            <Link to={`/resumeByUser/${user?.id}`} >See Your resume</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
