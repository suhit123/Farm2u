import styles from '@/styles/blogs.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Blogbox from '../components/blogbox';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/loader';
import { ColorRing } from 'react-loader-spinner';

interface Blog {
  // Define the properties of a single blog
  _id: number;
  title: string;
  image: string;
  publishDate:string;
  category:string;
  description:string;
  // Add other properties as needed
}

interface BlogsProps {
  data: Blog[]; // Define the prop type for data
}

const Blogs: React.FC<BlogsProps> = ({ initialData }:any) => {
const [blogs, setBlogs] = useState<Blog[]>(initialData);
  const [shownum, setShownum] = useState(2);
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
      const response = await axios.get(`/api/Blogs?start=${shownum+1}&end=${shownum + 3}`);
      const newBlogs = response.data;
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setShownum((prevShownum) => prevShownum + 3);
    } catch (error) {
      console.log('Error fetching more blogs:', error);
    } finally {
      setLoader1(false);
    }
  };
  return (
    <>
      <Loader time={1000} />
      <Nav />
      <div className={styles.blogbox_container}>
        {blogs.length!==0?blogs.map((blog) => {
          return <Blogbox blogboxdata={blog} key={blog._id} />;
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
            {loader1 ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
              />
            ) : (
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
              {loader2 ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                />
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

export async function getServerSideProps() {
    const baseUrl = process.env.VERCEL_URL;
    const response = await axios.get(`${baseUrl}/api/Blogs?start=0&end=2`);
    const initialData: Blog[] = response.data || [];
    return {
      props: {
        initialData,
      },
    };
  }

export default Blogs;
