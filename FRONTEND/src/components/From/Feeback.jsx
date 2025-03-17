import { useState } from "react";
import { Star } from "lucide-react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    comments: "",
    subscribe: false,
  });

  const [errors, setErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
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
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    if (formData.comments.length < 5)
      newErrors.comments = "Comments must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setResult("");

      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "382fe6ca-287b-4120-b94d-57d9eb723b13"
      );
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("comments", formData.comments);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      setIsSubmitting(false);

      if (data.success) {
        setResult("Form Submitted Successfully");
        setIsPopupVisible(true);
        setFormData({
          name: "",
          email: "",
          rating: 0,
          comments: "",
          subscribe: false,
        });
        setTimeout(() => setResult(""), 1000);
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    }
  };

  return (
    <div className="feedbacks">
      <div className="feedback-form">
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
            <label>Feedback:</label>
            <textarea
              name="comments"
              placeholder="Tell us about your experience..."
              value={formData.comments}
              onChange={handleInputChange}
              rows="4"
            />
            {errors.comments && (
              <span className="error">{errors.comments}</span>
            )}
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <div
              className="star-rating"
              style={{ display: "flex", gap: "5px" }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  size={30}
                  stroke="black"
                  fill={formData.rating >= star ? "gold" : "none"}
                  style={{
                    cursor: "pointer",
                    transition: "fill 0.2s ease-in-out",
                  }}
                />
              ))}
            </div>
            {errors.rating && <span className="error">{errors.rating}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>

        <span className="result-message">{result}</span>

        {isPopupVisible && (
          <>
            <div className="popup-overlay"></div>
            <div className="popup">
              <h3>Thank You!</h3>
              <p>
                Thank you for your feedback! We appreciate your time and effort
                in helping us improve.
              </p>
              <button onClick={() => setIsPopupVisible(false)}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
