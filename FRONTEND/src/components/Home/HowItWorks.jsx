import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobSphere Works</h3>
          <div className="banner">
            <div className="card" data-aos="zoom-in">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Sign up to unlock a world of career opportunities and
                recruitment tools tailored to your needs.
              </p>
            </div>
            <div className="card" data-aos="zoom-in">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Browse jobs that match your skills or post openings to find the
                perfect candidate.
              </p>
            </div>
            <div className="card" data-aos="zoom-in">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Seamlessly apply for jobs or connect with top talent to grow
                your team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
