import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import Loader from "../components/loader";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import fssai from "@/resources/certifications/fssai.png";
import GMP from "@/resources/certifications/GMP.jpg";
import HACCP from "@/resources/certifications/HACCP.jpeg";
import HALAL from "@/resources/certifications/HALAL.jpg";
import ISO from "@/resources/certifications/ISO.jpeg";
import KOSHER from "@/resources/certifications/KOSHER.jpeg";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import axios from "axios";
import Video_slider from "../components/Slider_video";
import bloghomestyles from "@/styles/home.module.css";
import React from "react";
import { Blog } from "@/Interfaces/Blogs";
export default function Home() {
  const [blogdata, setBlogData] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get("../api/Blogs?start=0&end=2")
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Head>
        <title>
          Genmatrix Remedies - Nutraceutical Supplements for a Healthier Life
        </title>
        <meta
          name="description"
          content="Discover a wide range of nutraceutical supplements at Genmatrix Remedies. Our products aim to empower you in your journey towards a healthier, happier life by providing essential minerals and nutrients. Join us in promoting health and well-being."
        />
        <meta
          name="keywords"
          content="Genmatrix Remedies,genmatrix,remedies,gene,matrix,Gene Matrix, Rorend,Zipper,Snoozer,Truying,Turqmax,Gowistrum,Re30's FSSAI, GMP, HACCP, HALAL, ISO, KOSHER"
        />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Loader time={1000} />
        <div className={styles.entire_landing_page}>
          <Nav />
          <div className={styles.landing_content}>
            <div className={styles.landing_content_block}>
              <h2>Welcome to</h2>
              <h3>
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    strings: ["GENMATRIX REMEDIES"],
                  }}
                ></Typewriter>
              </h3>
              <p>Marching Towards Gene Matrix</p>
            </div>
          </div>
          <div className={styles.landingpage_blogs}>
            <div className={styles.blogs_top}>
              <div className={styles.blogs_line}></div>
              <h4>OUR BLOGS</h4>
              <div className={styles.blogs_line}></div>
            </div>
            <div className={styles.blogbox_container}>
              {blogdata.length !== 0
                ? blogdata.slice(0, 4).map((blog: Blog, index: number) => {
                    return (
                      <div
                        className={styles.blogbox_container_blocks}
                        key={index}
                      >
                        <div className={bloghomestyles.blogbox_con}>
                          <div className={bloghomestyles.blogbox_image}>
                            <img
                              className={bloghomestyles.blogbox_image}
                              src={blog.image}
                              alt=""
                            />
                          </div>
                          <Link
                            href={`/blogs/${blog._id}`}
                            className={bloghomestyles.blogbox_heading}
                          >
                            <h3>{blog.title}</h3>
                          </Link>
                          <p className={bloghomestyles.content}>
                            {blog.description.slice(0, 150)}...{" "}
                            <Link
                              href={`/blogs/${blog._id}`}
                              className={bloghomestyles.blog_viewmore}
                            >
                              Continue reading
                            </Link>
                          </p>
                        </div>
                      </div>
                    );
                  })
                : [0, 1, 2].map((index: number) => {
                    return (
                      <div className={styles.blogbox_con_empty} key={index}>
                        <div className={styles.blogbox_image_empty}></div>
                        <div className={styles.blogbox_heading_empty}></div>
                        <div className={styles.content_empty}></div>
                      </div>
                    );
                  })}
            </div>
            <Link href="/blogs">
              <button className={styles.landing_blog_seemore}>See More</button>
            </Link>
          </div>
          <Video_slider />
          <div className={styles.company_certifications}>
            <div className={styles.company_certifications_top}>
              <div className={styles.company_certifications_line}></div>
              <h4>OUR CERTIFICATIONS</h4>
              <div className={styles.company_certifications_line}></div>
            </div>
            <div className={styles.company_certifications_images}>
              <Image src={fssai} alt="" width={100} height={100}/>
              <Image src={GMP} alt="" width={100} height={100}/>
              <Image src={HACCP} alt="" width={100} height={100}/>
              <Image src={HALAL} alt="" width={100} height={100}/>
              <Image src={ISO} alt="" width={100} height={100}/>
              <Image src={KOSHER} alt="" width={100} height={100}/>
            </div>
          </div>
          <div className={styles.contact_us_banner}>
            <div className={styles.contact_us_banner_block}>
              <h3>We'd love to hear from you</h3>
              <p>
                whether you had a question about product, pricing, or anything
                else, we are ready to answer all your questions.
              </p>
              <Link href="/contactus">
                <button>Contact us</button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
