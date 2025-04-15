import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface UserProfile {
  id?: number;
  email: string;
  full_name: string;
  is_premium: boolean;
  created_at: string;
}

function UserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const url = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${url}/users/${Number(id)}`);
        const data = await response.json();

        if (data.success) {
          setUser(data.payload);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Error fetching user", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Profile</h2>
      <div className="card shadow p-4">
        <p><strong>Full Name:</strong> {user?.full_name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Premium:</strong> {user?.is_premium ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default UserProfile;
