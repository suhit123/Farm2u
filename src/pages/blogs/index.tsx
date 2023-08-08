import styles from "@/styles/blogs.module.css";
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import blogboxstyles from "@/styles/blogbox.module.css";
import Image from "next/image";
import Link from "next/link";
import { BlogsProps, Blog } from "@/Interfaces/Blogs";
import Head from "next/head";
import { NextSeo } from "next-seo";
const Blogs: React.FC<BlogsProps> = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [shownum, setShownum] = useState<number>(0);
  const [notifyemail, setNotifyemail] = useState("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [loader1, setLoader1] = useState<boolean>(false);
  const [loader2, setLoader2] = useState<boolean>(false);

  const handlenotify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader2(true);
    await axios
      .post("../api/notifyemails", { email: notifyemail })
      .then((res) => {
        setEmailSent(true);
        setLoader2(false);
        console.log("Successfully registered!");
      })
      .catch((err) => {
        console.log("Already registered!");
      })
      .finally(() => {
        setLoader2(false);
      });
  };
  const loadMoreBlogs = async () => {
    setLoader1(true);
    try {
      const response = await axios.get(
        `/api/Blogs?start=${shownum}&end=${shownum + 2}`
      );
      const newBlogs = response.data;
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setShownum((prevShownum) => prevShownum + 3);
    } catch (error) {
      console.log("Error fetching more blogs:", error);
    } finally {
      setLoader1(false);
    }
  };
  useEffect(() => {
    loadMoreBlogs();
  }, []);
  return (
    <>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Genmatrix Remedies - Blogs"
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
          url: "https://genmatrix.vercel.app/blogs",
          title: "Genmatrix Remedies - Blogs",
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
      <Loader time={1000} />
      <Nav />
      <div className={styles.blogbox_container}>
        {blogs.length !== 0
          ? blogs.map((blog) => {
              return (
                <div className={blogboxstyles.blogbox_con}>
                  <div className={blogboxstyles.blogbox_image}>
                    <Image
                      className={blogboxstyles.blogbox_image}
                      src={blog.image}
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <Link
                    href={`/blogs/${blog._id}`}
                    className={blogboxstyles.blogbox_heading}
                  >
                    <h3>{blog.title}</h3>
                  </Link>
                  <div className={blogboxstyles.blogbox_details}>
                    <p className={blogboxstyles.companyname}>
                      Genmatrix Remedies
                    </p>
                    <p>{blog.publishDate}</p>
                  </div>
                  <p className={blogboxstyles.content}>
                    {blog.description.slice(0, 150)}...{" "}
                    <Link
                      href={`/blogs/${blog._id}`}
                      className={blogboxstyles.blog_viewmore}
                    >
                      Continue reading
                    </Link>
                  </p>
                </div>
              );
            })
          : [0, 1, 2].map((_, index) => {
              return (
                <div className={styles.blogbox_con_empty} key={index}>
                  <div className={styles.blogbox_image_empty}></div>
                  <div className={styles.blogbox_heading_empty}></div>
                  <div className={styles.blogbox_details_empty}>
                    <div className={styles.companyname_empty}></div>
                    <div className={styles.content_empty}></div>
                  </div>
                  <p className={styles.content}></p>
                </div>
              );
            })}
      </div>
      <div className={styles.blogs_loadmore_btn}>
        {shownum > blogs.length ? (
          <p className={styles.endofresults}>End of the results!</p>
        ) : (
          <button onClick={loadMoreBlogs} disabled={loader1}>
            {loader1 ? (
              <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
            ) : (
              "Load more"
            )}
          </button>
        )}
      </div>
      <div className={styles.blognotification_container}>
        <div className={styles.blognotification_box1}>
          <h4>Get the latest updates</h4>
          <p>Enter your email to never miss posts</p>
        </div>
        <div className={styles.blognotification_box2}>
          <form onSubmit={handlenotify}>
            <input
              type="mail"
              placeholder="example@gmail.com"
              name="email"
              onChange={(e) => {
                setNotifyemail(e.target.value);
              }}
              required
            />
            <button type="submit">
              {loader2 ? (
                <FontAwesomeIcon width={14} icon={faSpinner} className="fa-spin" />
              ) : (
                !loader2 && (emailSent ? <>Sent</> : <>Notify</>)
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Blogs;
