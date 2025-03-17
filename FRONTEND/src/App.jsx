import { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJobs from "./components/Job/PostJob";
import Applications from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplication";
import NotFound from "./components/NotFound/NotFound";
import AdminPanel from "./components/AdminPanal/AdminPanel";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AboutPage from "./components/AboutPage/AboutPage";

// Use environment variable for backend URL with a fallback for local development
const BACKEND_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8000";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/getuser`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error fetching user:", error.response || error.message);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Applications />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/aboutpage" element={<AboutPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
