import { useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularCompanies = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 10,
      // icon: <FaMicrosoft className="icon-microsoft" style={{ color: "#0078D4", fontSize: "2rem" }} />, // Microsoft blue
      icon: (
        <div className="microsoft-logo">
          <div className="square red"></div>
          <div className="square green"></div>
          <div className="square blue"></div>
          <div className="square yellow"></div>
        </div>
      ),
      animation: "fade-right",
    },
    {
      id: 2,
      title: "Tesla",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 5,
      icon: <SiTesla style={{ color: "#E82127", fontSize: "2rem" }} />, // Tesla red
      animation: "fade-left",
    },
    {
      id: 3,
      title: "Apple",
      location: "Street 10 Karachi, Pakistan",
      openPositions: 20,
      icon: <FaApple style={{ color: "#000000", fontSize: "2rem" }} />, // Apple black
      animation: "fade-right",
    },
  ];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => (
            <div className="card" key={element.id} data-aos={element.animation}>
              <div className="content">
                <div className="icon">{element.icon}</div>
                <div className="text">
                  <p>{element.title}</p>
                  <p>{element.location}</p>
                </div>
              </div>
              <button>Open Positions {element.openPositions}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
