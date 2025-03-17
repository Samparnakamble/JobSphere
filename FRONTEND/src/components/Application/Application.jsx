import axios from "axios";
import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import AOS from "aos";
import "aos/dist/aos.css";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for managing submission status

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Set the submission state to true
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://jobsphere-5mks.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null); // Reset the resume to null
      toast.success(data.message);
      navigateTo("/applications/me");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false); // Reset the submission state
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication} data-aos="fade-down">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <textarea
            placeholder="CoverLetter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png, .webp"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
