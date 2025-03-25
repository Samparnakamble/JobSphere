import { useContext, useState, useEffect } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneFlip } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://jobsphere-5mks.onrender.com/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data.token) {
        // ✅ Store token in localStorage & sessionStorage
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("token", data.token);

        // ✅ Set Axios default headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success(data.message);
        setIsAuthorized(true);
      } else {
        throw new Error("Token missing in response");
      }

      // ✅ Clear form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage">
      <div className="container" data-aos="fade-up">
        <div className="header">
          <img src="/jobLogo.png" alt="logo" />
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label>Register As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="Example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label>Phone Number</label>
            <div>
              <input
                type="text"
                placeholder="+91 855 1234-567"
                value={phone}
                pattern="[2-9]{1}[0-9]{9}"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhoneFlip />
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div className="passwordContainer">
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

          {/* Show Password Checkbox */}
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

          <button type="submit">Register</button>
          <Link to={"/login"}>Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="register" />
      </div>
    </section>
  );
};

export default Register;
