import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://jobsphere-5mks.onrender.com/api/v1/admin/all-users",
          {
            withCredentials: true,
          }
        );

        setUsers(data.users);

        // Calculate counts for job seekers and employers
        const jobSeekers = data.users.filter(
          (user) => user.role === "Job Seeker"
        );
        const employers = data.users.filter((user) => user.role === "Employer");

        setJobSeekerCount(jobSeekers.length);
        setEmployerCount(employers.length);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId, role) => {
    await axios
      .delete(`https://jobsphere-5mks.onrender.com/api/v1/admin/delete-user/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);

        // Update users and counts after deletion
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        if (role === "Job Seeker") {
          setJobSeekerCount((prevCount) => prevCount - 1);
        } else if (role === "Employer") {
          setEmployerCount((prevCount) => prevCount - 1);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete user.");
      });
  };

  return (
    <section className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Job Seekers Section */}
      <div className="section">
        <h2>Job Seekers ({jobSeekerCount})</h2>
        <div className="list">
          {users
            .filter((user) => user.role === "Job Seeker")
            .map((user) => (
              <div key={user._id} className="card">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id, "Job Seeker")}
                  className="btn-delete"
                >
                  Delete User
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Employers Section */}
      <div className="section">
        <h2>Employers ({employerCount})</h2>
        <div className="list">
          {users
            .filter((user) => user.role === "Employer")
            .map((user) => (
              <div key={user._id} className="card">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id, "Employer")}
                  className="btn-delete"
                >
                  Delete User
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
