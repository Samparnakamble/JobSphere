import { useState, useEffect } from "react";

const QuotesSlider = () => {
  const quotes = [
    "The road to success isn’t a straight path; it’s an exciting journey full of unexpected opportunities!",
    "Every job application is a step closer to unlocking your next adventure—go ahead, make it epic!",
    "Don’t just look for a job—chase the career that makes your heart race!",
    "Opportunities don’t wait—jump in, take the plunge, and make your career journey legendary!",
    "Your career is an adventure waiting to be written. Grab that pen, and make every chapter thrilling!",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="quote">
      <div className="container">
        <div className="containerStyle">
          <span className="quote-icon">❝</span>
          <div className="quote-text" key={currentQuoteIndex}>
            {quotes[currentQuoteIndex]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesSlider;
