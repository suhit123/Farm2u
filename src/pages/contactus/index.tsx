import { useState } from "react";
import React from "react";
import styles from "@/styles/contactus.module.css";
import Image from "next/image";
import contactpageimage from "@/resources/contactpagebanner.png";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { contact } from "@/Interfaces/contactUs";
import Head from "next/head";
import { NextSeo } from "next-seo";
const Contactus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [user, setUser] = useState<contact>({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const handlechange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const userSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/api/SMTP/contactus", user)
        .then((res: any) => {
          console.log(res.data.message);
          setSuccess(true);
        })
        .catch((err) => {
          setSuccess(false);
          alert("Something gone wrong!");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log("Something went wrong");
    }
  };
  return (
    <>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Genmatrix Remedies - Contact us"
        description="We, at GENMATRIX REMEDIES, strive to build a bond of Love and Trust
      with our valued customers worldwide. With our range of nutraceutical
      supplements, we aim to empower you in your journey towards a
      healthier, happier life."
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Genmatrix Remedies,genmatrix,remedies,gene,matrix,Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's FSSAI, GMP, HACCP, HALAL, ISO, KOSHER",
          },
          {
            name: "distribution",
            content: "global",
          },
          {
            name: "rating",
            content: "general",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
        openGraph={{
          type: "website",
          url: "https://genmatrix.in/contactus",
          title: "Genmatrix Remedies - Contact us",
          description:
            "We, at GENMATRIX REMEDIES, strive to build a bond of Love and Trust with our valued customers worldwide. With our range of nutraceutical supplements, we aim to empower you in your journey towards a healthier, happier life.",
          images: [
            {
              url:
                "https://user-images.githubusercontent.com/105535366/258575801-4a10d747-83fa-48ae-af92-5027a37eb49c.png",
              width: 600,
              height: 600,
              alt: "Og Image Alt",
            },
          ],
        }}
      />
      <Nav />
      <div className={styles.contactuspage_container_block1}>
        <div className={styles.contactuspage_container_block1_box1}>
          <form className={styles.contactusform} onSubmit={userSubmit}>
            <h3>Contact us</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handlechange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handlechange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone number"
              value={user.phoneNumber}
              onChange={handlechange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="subject"
              value={user.subject}
              onChange={handlechange}
              required
            />
            <textarea
              name="message"
              placeholder="message"
              value={user.message}
              onChange={handlechange}
            ></textarea>
            {success ? (
              <p className={styles.successmsg}>
                ✅ Successfully sent this message !
              </p>
            ) : (
              <></>
            )}
            <button type="submit">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                <p>Submit</p>
              )}
            </button>
          </form>
        </div>
        <div className={styles.contactuspage_container_block1_box2}>
          <Image src={contactpageimage} alt="" />
          <div className={styles.contactuspage_container_block1_box2_blocks}>
            <div className={styles.contactuspage_container_block1_box2_block}>
              <h4>Contact Us</h4>
              <p>Monday - Sunday</p>
              <p>Working Hours 9AM-10PM</p>
              <p>Feel free to call us on</p>
              <p>
                <a
                  style={{ textDecoration: "none", color: "grey" }}
                  href="tel:7569444410"
                >
                  7569444410
                </a>
              </p>
            </div>
            <div className={styles.contactuspage_container_block1_box2_block}>
              <h4>Our Email</h4>
              <p>Drop us a line anytime at</p>
              <p>
                <a
                  style={{ textDecoration: "none", color: "grey" }}
                  href="mailto:gnxremedys@gmail.com"
                >
                  gnxremedys@gmail.com
                </a>
              </p>
              <p>and we'll get back soon</p>
            </div>
            <div className={styles.contactuspage_container_block1_box2_block}>
              <h4>Our Address</h4>
              <p>GENMATRIX Remedies,</p>
              <p>F115, PADMADHAM APARTMENTS,</p>
              <p>VIJAYAPURI COLONY,</p>
              <p>SECUNDERABAD, 500017</p>
            </div>
          </div>
        </div>
      </div>
      <iframe
        className={styles.contactusmap}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.477600397684!2d78.52954141392536!3d17.48470024909373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9baa5cca5a41%3A0x745662c3aad3b3b7!2sGenmatrix%20Remedies!5e0!3m2!1sen!2sin!4v1686063691834!5m2!1sen!2sin"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
      <Footer />
    </>
  );
};
export default Contactus;
