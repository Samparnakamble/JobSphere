import { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jobsphere-5mks.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.token) {
        // Store token in both localStorage and sessionStorage
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);

        // Set Axios default headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success(data.message);
        setIsAuthorized(true);
      } else {
        throw new Error("Token missing in response");
      }

      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage">
      <div className="container" data-aos="fade-down">
        <div className="header">
          <img src="/jobLogo.png" alt="logo" />
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Admin">Admin</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLock2Fill />
            </div>
          </div>
          <div className="showPasswordCheckbox">
            <label>
              <input
                type="checkbox"
                checked={isPasswordVisible}
                onChange={() => setIsPasswordVisible(!isPasswordVisible)}
              />
              Show Password
            </label>
          </div>
          <button type="submit">Login</button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/login.png" alt="login" />
      </div>
    </section>
  );
};

export default Login;
