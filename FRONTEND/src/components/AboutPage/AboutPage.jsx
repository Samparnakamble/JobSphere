import { Img } from "react-image";
import Feeback from "../From/Feeback.jsx";

export default function AboutPage() {
  return (
    <div className="container_about">
      <div className="about-main">
        {/* About Us Section */}

        <section className="about-section-1">
          <h6>About Us &#62;</h6>
          <h3 className="about-welcome">Welcome to JobSphere...</h3>
          <br />
          <p>
            Your trusted platform for connecting job seekers and employers in a
            seamless, efficient, and user-friendly way. At JobSphere, we aim to
            bridge the gap between talent and opportunity by providing a space
            where aspiring employees can find their dream jobs, and employers
            can discover the best candidates to meet their business needs.
          </p>
          <br />
          <Img
            src="/AboutUs/img2.png"
            alt="Business analytics dashboard"
            width={1200}
            height={400}
          />
        </section>

        {/* Features Section */}
        <section className="about-section-2">
          <h2>Our Features</h2>

          {/* Job Seekers */}

          <div className="element">
            <div>
              <h3>For Job Seekers...</h3>
              <br />
              <p>
                {" "}
                We understand the importance of finding a career that matches
                your skills. With JobSphere, you can:
              </p>
              <ul
                className="list-about "
                style={{ listStyleType: "circle", paddingLeft: "20px" }}
              >
                <li>
                  Create a personalized profile, including your resume, address,
                  and other essential details.
                </li>
                <li>
                  Browse a wide range of job opportunities across industries.
                </li>
                <li>Apply for jobs that align with your goals effortlessly.</li>
              </ul>
            </div>
            <div>
              <Img
                src="/AboutUs/img3.jpg"
                alt="Job seeker working"
                width={400}
                height={200}
                className="image-style"
              />
            </div>
          </div>

          {/* Employers */}

          <div className="element employer">
            <div>
              <Img
                src="/AboutUs/img1.jpg"
                alt="Team meeting"
                width={400}
                height={200}
                className="image-style"
              />
            </div>
            <div>
              <h3>For Employers...</h3>
              <br />
              <p>
                {" "}
                Finding the right candidate is key to business success.
                JobSphere provides employers with tools to:
              </p>
              <ul
                className="list-about"
                style={{
                  listStyleType: "circle" /* For the list bullets */,
                  paddingLeft:
                    "20px" /* Adjusts the left padding for the list */,
                  display: "block",
                }}
              >
                <li style={{ listStyleType: "circle" }}>
                  Post, update, delete, and manage job listings effortlessly.
                </li>
                <li>
                  Access detailed profiles of job seekers, complete with resumes
                  and other critical information.
                </li>
                <li>
                  Streamline the recruitment process through our intuitive
                  dashboard.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}

        <section className="about-section-3">
          <h2>Why Choose Us?</h2>
          <ul>
            <div>
              <li>
                <b>Simplified Experience:</b> Designed with ease of use in mind
                for both job seekers and employers
              </li>
            </div>
            <br />
            <div>
              <li>
                <b>Advanced Technology:</b>
                Built using cutting-edge tools, including Flutter for mobile
                apps and MongoDB for secure data management.
              </li>
            </div>
            <br />
            <div>
              <li>
                <b>All-in-One Platform:</b> From job applications to hiring
                decisions, we offer a comprehensive solution
              </li>
            </div>
            <br />
            <div>
              <li>
                <b>Community Focus:</b> We are dedicated to empowering job
                seekers building strong teams
              </li>
            </div>
          </ul>
        </section>

        {/* Mission Section */}

        <section className="about-section-4">
          <h2>Our Mission</h2>
          <div className="element">
            <div className="misson">
              <p>
                To empower individuals and organizations by connecting the right
                talent with the right opportunities, while fostering a culture
                of innovation, inclusivity, and growth. We’re more than a team;
                we’re a family, driven by a shared passion for making a
                difference. Join us on this journey to redefine the future of
                recruitment and job searching!
              </p>
              <pre>&quot; Lets build a brighter future, together! &quot;</pre>
            </div>
            <div>
              <br />

              <Img
                src="/AboutUs/img4.jpg"
                alt="Job seeker working"
                className="image-style"
              />
            </div>
          </div>
        </section>

        {/* Team Section */}

        <section className="about-section-5">
          <h2>Our Team</h2>
          <p>
            At JobSphere, our team is the driving force behind everything we do.
            We are a passionate group of developers, designers, and visionaries
            dedicated to revolutionizing the job-seeking experience. With a
            shared commitment to innovation, we blend cutting-edge technology
            with user-centric design to create a seamless and efficient
            job-matching platform. Together, we work tirelessly to ensure both
            job seekers and employers find value, efficiency, and success on our
            platform. From intuitive UI/UX to intelligent job-matching
            algorithms, we strive to make job searching and hiring smarter,
            faster, and more accessible.
          </p>
        </section>

        <br />
        <br />

        <section className="about-section-6">
          <h2>FeedBack</h2>
          <p>
            Your opinion matters! Help us make JobSphere the ultimate
            job-seeking experience.
          </p>
          <Feeback />
        </section>
      </div>
    </div>
  );
}
