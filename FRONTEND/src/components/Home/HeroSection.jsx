import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaBuilding,
  FaSuitcase,
  FaUsers,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroSection = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasUpdated = useRef(false);

  const heroImages = [
    { id: 1, src: "/heroS.jpg", alt: "Hero Image 1" },
    { id: 2, src: "/job2.avif", alt: "Hero Image 2" },
    { id: 4, src: "job5.jpg", alt: "Hero Image 4" },
  ];

  useEffect(() => {
    AOS.init({ duration: 4000 });

    const fetchVisitCount = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/visit/visit-count"
        );
        setVisitCount(res.data.count);
      } catch (error) {
        console.error("Error fetching visit count:", error);
      }
    };

    if (!hasUpdated.current) {
      hasUpdated.current = true;
      const updateVisitCount = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/visit/update-visit"
          );
          setVisitCount(res.data.count);
        } catch (error) {
          console.error("Error updating visit count:", error);
        }
      };

      fetchVisitCount();
      updateVisitCount();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const details = [
    {
      id: 1,
      count: 123441,
      subTitle: "Live Job",
      icon: <FaSuitcase style={{ color: "#3498db" }} />,
    },
    {
      id: 2,
      count: 91220,
      subTitle: "Companies",
      icon: <FaBuilding style={{ color: "#2ecc71" }} />,
    },
    {
      id: 3,
      count: 234200,
      subTitle: "Job Seekers",
      icon: <FaUsers style={{ color: "#9b59b6" }} />,
    },
    {
      id: 4,
      count: 103761,
      subTitle: "Employers",
      icon: <FaUserPlus style={{ color: "#e67e22" }} />,
    },
    {
      id: 5,
      count: visitCount,
      subTitle: "Total Visits",
      icon: <FaUser style={{ color: "#e74c3c" }} />,
    },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title" data-aos="fade-up">
          <h1>Your Sphere of Opportunities Awaits!</h1>
          <h6>
            Connecting Talented Job Seekers with Innovative Employers—All in One
            Place.
          </h6>
        </div>
        <div className="image">
          <img
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
          />
        </div>
      </div>
      <div className="details">
        {details.map((element) => (
          <div className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="content">
              <p>
                <CountUp
                  start={0}
                  end={element.count}
                  duration={2.5}
                  separator=","
                />
              </p>
              <p>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
