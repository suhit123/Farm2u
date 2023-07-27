import styles from '@/styles/blogs.module.css';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import {useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/loader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import blogboxstyles from '@/styles/blogbox.module.css'
import Image from 'next/image';
import Link from 'next/link';
import {BlogsProps,Blog} from '@/components/Interfaces/Blogs';
const Blogs: React.FC<BlogsProps> = () => {
const [blogs, setBlogs] = useState<Blog[]>([]);
  const [shownum, setShownum] = useState(0);
  const [notifyemail, setNotifyemail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);

  const handlenotify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader2(true);
    await axios
      .post('../api/notifyemails', { email: notifyemail })
      .then((res) => {
        setEmailSent(true);
        setLoader2(false);
        console.log('Successfully registered!');
      })
      .catch((err) => {
        console.log('Already registered!');
      })
      .finally(() => {
        setLoader2(false);
      });
  };
  const loadMoreBlogs = async () => {
    setLoader1(true);
    try {
      const response = await axios.get(`/api/Blogs?start=${shownum}&end=${shownum + 2}`);
      const newBlogs = response.data;
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setShownum((prevShownum) => prevShownum + 3);
    } catch (error) {
      console.log('Error fetching more blogs:', error);
    } finally {
      setLoader1(false);
    }
  };
  useEffect(()=>{
    loadMoreBlogs();
  },[])
  return (
    <>
      <Loader time={1000} />
      <Nav />
      <div className={styles.blogbox_container}>
        {blogs.length!==0?blogs.map((blog) => {
          return (
            <div className={blogboxstyles.blogbox_con}>
              <div className={blogboxstyles.blogbox_image}><Image className={blogboxstyles.blogbox_image} src={blog.image} alt="" width={100} height={100}/></div>
              <Link href={`/blogs/${blog._id}`} className={blogboxstyles.blogbox_heading}><h3>{blog.title}</h3></Link>
              <div className={blogboxstyles.blogbox_details}>
                <p className={blogboxstyles.companyname}>Genmatrix Remedies</p>
                <p>{blog.publishDate}</p>
              </div>
            <p className={blogboxstyles.content}>{blog.description.slice(0,150)}... <Link href={`/blogs/${blog._id}`} className={blogboxstyles.blog_viewmore}>Continue reading</Link></p>
            </div>
          );
        }):[0, 1, 2].map((_, index) => {
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
          })
        }
      </div>
      <div className={styles.blogs_loadmore_btn}>
      {shownum > blogs.length ? (
          <p className={styles.endofresults}>End of the results!</p>
        ) : (
          <button onClick={loadMoreBlogs} disabled={loader1}>
            {loader1 ? (<FontAwesomeIcon icon={faSpinner} className="fa-spin" />) : (
              'Load more'
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
              {loader2 ? (<FontAwesomeIcon icon={faSpinner} className="fa-spin" />) : (
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

// export async function getServerSideProps() {
//     const baseUrl = process.env.VERCEL_URL;
//     const response = await axios.get(`${baseUrl}/api/Blogs?start=0&end=2`);
//     const initialData: Blog[] = response.data || [];
//     return {
//       props: {
//         initialData,
//       },
//     };
//   }

export default Blogs;
