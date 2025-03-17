import { useEffect } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularCategories = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: (
        <MdOutlineDesignServices
          style={{ color: "#ff5733", fontSize: "2rem" }}
        />
      ),
      animation: "slide-right",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled style={{ color: "#33c3ff", fontSize: "2rem" }} />,
      animation: "slide-left",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook style={{ color: "#ff33a8", fontSize: "2rem" }} />,
      animation: "slide-right",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact style={{ color: "#61dafb", fontSize: "2rem" }} />, // React logo color
      animation: "slide-left",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance style={{ color: "#ffaa00", fontSize: "2rem" }} />,
      animation: "slide-right",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: (
        <GiArtificialIntelligence
          style={{ color: "#8e44ad", fontSize: "2rem" }}
        />
      ),
      animation: "slide-left",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: (
        <MdOutlineAnimation style={{ color: "#2ecc71", fontSize: "2rem" }} />
      ),
      animation: "slide-right",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController style={{ color: "#e74c3c", fontSize: "2rem" }} />,
      animation: "slide-left",
    },
  ];

  return (
    <div
      className="HoneCat"
      style={{
        background: "#f1f3f6",
      }}
    >
      <div className="categories">
        <h3>POPULAR CATEGORIES</h3>
        <div className="banner">
          {categories.map((element) => {
            return (
              <div
                className="card"
                key={element.id}
                data-aos={element.animation} // Dynamically assign the AOS animation
              >
                <div className="icon">{element.icon}</div>
                <div className="text">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
