import { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? " footerShow" : "footerHide"}>
      <div>
        &copy; 2025 Jabsphere. All rights reserved By Dept. of Comp. Sci. SSBES
        ITM Nanded{" "}
      </div>
      <div>Terms | Conditions | Privacy Policy</div>
      <div>
        <Link to="#" target="_blank">
          <FaFacebook />
        </Link>

        <Link to="#" target="_blank">
          <FaLinkedin />
        </Link>
        <Link to="#" target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
