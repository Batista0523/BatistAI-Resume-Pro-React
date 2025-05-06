import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaUserCircle, FaTrophy } from "react-icons/fa";
import ResumeByUser from "../components/ResumeByUser";
import { motion } from "framer-motion";
interface UserProfiles {
  id: number;
  email: string;
  full_name: string;
  is_premium: boolean;
  created_at: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<UserProfiles | null>(null);
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
    <section className="container my-5">
      <motion.div
        className="d-flex justify-content-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="card shadow-lg border-0 p-5 w-100 bg-white rounded-4"
          style={{ maxWidth: "800px" }}
        >
          <div className="text-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FaUserCircle size={120} className="text-secondary mb-3" />
            </motion.div>
  
            <h2 className="fw-bold text-primary">{user?.full_name}</h2>
  
            <motion.div
              className="my-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {user?.is_premium ? (
                <span className="badge bg-success fs-6 px-3 py-2 rounded-pill">
                  🌟 Premium Member
                </span>
              ) : (
                <span className="badge bg-warning text-dark fs-6 px-3 py-2 rounded-pill">
                  🔓 Basic Member
                </span>
              )}
            </motion.div>
          </div>
  
          <hr />
  
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="mb-1">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="mb-0">
              <strong>Account Created:</strong>{" "}
              {user
                ? new Date(user.created_at).toLocaleDateString()
                : "Loading..."}
            </p>
          </motion.div>
  
          <hr />
  
          <motion.div
            className="d-flex flex-wrap gap-3 justify-content-center mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {!user?.is_premium && (
              <Link to="/payments">
                <button className="btn btn-warning text-dark d-flex align-items-center px-4 py-2 rounded-3 shadow-sm">
                  <FaTrophy className="me-2" /> Upgrade to Premium
                </button>
              </Link>
            )}
            <Link
              to="/createResume"
              className="btn btn-success d-flex align-items-center px-4 py-2 fw-bold rounded-3 shadow-sm"
            >
              ✍️ Create Your Resume
            </Link>
          </motion.div>
        </div>
      </motion.div>
  
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ResumeByUser />
      </motion.div>
    </section>
  );
  
};

export default UserProfile ;
