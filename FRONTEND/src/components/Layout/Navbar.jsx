import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <Link to={"/"} onClick={() => setShow(false)}>
          <div className="logo">
            <img src="\logo-new.png" alt="logo" />
            <div className="text-overlay">
              <b>Job</b>
              <b>Sphere</b>
            </div>
          </div>
        </Link>

        {/* Conditional rendering based on role */}
        <ul className={!show ? "menu" : "show-menu menu"}>
          {user && user.role === "Admin" ? (
            <>
              {/* Admin Panel Link */}
              <li>
                <Link to={"/adminpanel"} onClick={() => setShow(false)}>
                  ADMIN PANEL
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Non-Admin Navigation Links */}
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={"/job/getall"} onClick={() => setShow(false)}>
                  ALL JOBS
                </Link>
              </li>

              <li>
                <Link to={"/applications/me"} onClick={() => setShow(false)}>
                  {user && user.role === "Employer"
                    ? "APPLICANT'S APPLICATIONS"
                    : "MY APPLICATIONS"}
                </Link>
              </li>

              {user && user.role !== "Employer" && (
                <li>
                  <Link to={"/aboutpage"} onClick={() => setShow(false)}>
                    ABOUT US
                  </Link>
                </li>
              )}
              {user && user.role === "Employer" ? (
                <>
                  <li>
                    <Link to={"/job/post"} onClick={() => setShow(false)}>
                      POST NEW JOB
                    </Link>
                  </li>
                  <li>
                    <Link to={"/job/me"} onClick={() => setShow(false)}>
                      VIEW YOUR JOBS
                    </Link>
                  </li>
                  <li>
                    <Link to={"/aboutpage"} onClick={() => setShow(false)}>
                      ABOUT US
                    </Link>
                  </li>
                </>
              ) : null}
            </>
          )}

          {/* Logout Button */}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
