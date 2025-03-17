import { useState } from "react";
// import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button text

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (formData.message.length < 2)
      newErrors.message = "Message must be at least 5 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true); // Set button text to "Sending..."
      setResult("");

      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "382fe6ca-287b-4120-b94d-57d9eb723b13"
      );
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      setIsSubmitting(false); // Reset button text

      if (data.success) {
        setResult("Form Submitted Successfully");
        setIsPopupVisible(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Hide success message after 1 second
        setTimeout(() => setResult(""), 1000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    }
  };

  return (
    <div
      className="homeContact"
      style={{
        background: "#f1f3f6",
      }}
    >
      <div className="container contacts" >
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && (
                <span className="error">{errors.subject}</span>
              )}
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
              />
              {errors.message && (
                <span className="error">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <span className="result-message">{result}</span>

          {/* Popup Modal */}
          {isPopupVisible && (
            <>
              <div className="popup-overlay"></div>
              <div className="popup">
                <h3>Thank You!</h3>
                <p>Thank you for reaching out. We will get back to you soon.</p>
                <button onClick={() => setIsPopupVisible(false)}>Close</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
